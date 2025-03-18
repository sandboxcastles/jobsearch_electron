import { AvailableTokensServiceContract } from "../interfaces/available-tokens-service.interface";

export class AvailableTokensService implements AvailableTokensServiceContract {
    async getAvailableTokens(): Promise<AvailableToken[]> {
        return window.electron.getAvailableTokens();
    }

    async createAvailableToken(createToken: CreateAvailableToken): Promise<AvailableToken | null> {
        return window.electron.insertAvailableToken(createToken);
    }

    async updateAvailableToken(updateToken: Partial<AvailableToken>): Promise<AvailableToken | null> {
        console.log('update token not implemented: ', updateToken);
        return new Promise((res) => res(null));
    }
}
