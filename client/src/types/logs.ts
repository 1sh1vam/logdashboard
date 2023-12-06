export type LogT = {
    id: string;
    userId: string;
    createdAt: string;
    status: 'success' | 'failed';
    errorMsg?: string;
    request: object;
    response: object;
}

export type LogStateT = {
    status: 'init' | 'pending' | 'success' | 'failed';
    msg?: string;
}