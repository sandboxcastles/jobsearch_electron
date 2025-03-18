export interface AvailableTokensServiceContract {
    getAvailableTokens: () => Promise<AvailableToken[]>
    createAvailableToken: (createToken: CreateAvailableToken) => Promise<AvailableToken | null>;
    updateAvailableToken: (updateToken: Partial<AvailableToken>) => Promise<AvailableToken | null>;
}