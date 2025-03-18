import { useEffect, useState } from "react";
import { AvailableTokensService } from "../services/available-tokens.service";
import { CopyableTextService } from "../services/copyable-text.service";

const availableTokensService = new AvailableTokensService();
const copyableTextService = new CopyableTextService();

export function useAvailableTokens(): [AvailableToken[], (availableTokens: AvailableToken[]) => void] {
    const [items, setItems] = useState<AvailableToken[]>([]);
    
    useEffect(() => {
        availableTokensService.getAvailableTokens().then(allItems => setItems(allItems));
    }, []);

    return [items, setItems];
}

export function useCopyableText(): [CopyableText[], (copyableTextEntries: CopyableText[]) => void] {
    const [items, setItems] = useState<CopyableText[]>([]);
    
    useEffect(() => {
        copyableTextService.getAll().then(allItems => setItems(allItems));
    }, []);

    return [items, setItems];
}