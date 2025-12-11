export declare class AppController {
    getHealth(): {
        status: string;
        timestamp: string;
        service: string;
    };
    getRoot(): {
        message: string;
        version: string;
        endpoints: {
            health: string;
            auth: string;
        };
    };
}
