import { Injectable, Inject, HttpException, HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
     private readonly logger = new Logger(AuthService.name);

     constructor(
          @Inject('DATABASE_CONNECTION') private pool: Pool,
          private jwtService: JwtService,
     ) { }

     private extractCountryCodeAndPhone(fullPhone: string): { countryCode: string; phoneNumber: string } {
          // Remove all non-digit characters
          const digitsOnly = fullPhone.replace(/\D/g, "");

          let countryCode = "";
          let phoneNumber = "";

          // India: 91 + 10 digits
          if (digitsOnly.startsWith("91") && digitsOnly.length === 12) {
               countryCode = "91";
               phoneNumber = digitsOnly.substring(2);
          }
          // US/Canada: 1 + 10 digits
          else if (digitsOnly.startsWith("1") && digitsOnly.length === 11) {
               countryCode = "1";
               phoneNumber = digitsOnly.substring(1);
          }
          // UK: 44 + 10 digits
          else if (digitsOnly.startsWith("44") && digitsOnly.length === 12) {
               countryCode = "44";
               phoneNumber = digitsOnly.substring(2);
          }
          // China: 86 + 11 digits
          else if (digitsOnly.startsWith("86") && digitsOnly.length === 13) {
               countryCode = "86";
               phoneNumber = digitsOnly.substring(2);
          }
          // Default: assume phone number is 10 digits, rest is country code
          else if (digitsOnly.length > 10) {
               countryCode = digitsOnly.substring(0, digitsOnly.length - 10);
               phoneNumber = digitsOnly.substring(digitsOnly.length - 10);
          }
          else {
               // If less than or equal to 10 digits, assume no country code
               countryCode = "";
               phoneNumber = digitsOnly;
          }

          return { countryCode, phoneNumber };
     }

     async login(phone: string, plainPassword: string) {
          const normalizedPhone = phone.replace(/\D/g, '');
          this.logger.log(`Attempting login for phone: ${normalizedPhone}`);

          // Extract country code and phone number
          const { countryCode, phoneNumber } = this.extractCountryCodeAndPhone(normalizedPhone);
          this.logger.log(`Extracted - Country Code: ${countryCode}, Phone: ${phoneNumber}`);

          let user;

          // STEP 1: Database Query
          try {
               const query = `
         SELECT id, country_code, phone, name, password_plain 
         FROM users 
         WHERE country_code = $1 AND phone = $2
       `;
               const result = await this.pool.query(query, [countryCode, phoneNumber]);
               user = result.rows[0];
          } catch (error) {
               this.logger.error('CRITICAL: Database connection or query failed', error);
               throw new InternalServerErrorException('Database error. Check backend terminal.');
          }

          // STEP 2: Validation Logic

          // Check if user exists
          if (!user) {
               this.logger.warn(`Login Failed: User not found for phone ${normalizedPhone}`);
               // Using generic HttpException is safer against 500 conversion issues
               throw new HttpException('Invalid phone number or password', HttpStatus.UNAUTHORIZED);
          }

          // Check Password
          if (plainPassword !== user.password_plain) {
               this.logger.warn(`Login Failed: Password mismatch for phone ${normalizedPhone}`);
               throw new HttpException('Invalid phone number or password', HttpStatus.UNAUTHORIZED);
          }

          // STEP 3: Success
          this.logger.log(`Login successful for: ${normalizedPhone}`);

          const payload = { sub: user.id, phone: user.phone, name: user.name };

          return {
               access_token: this.jwtService.sign(payload),
               user: {
                    name: user.name,
                    phone: user.phone
               }
          };
     }
}