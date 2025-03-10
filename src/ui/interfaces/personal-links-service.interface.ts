import { PersonalLink } from "../models/PersonalLink.model";

export interface PersonalLinksServiceContract {
    getPersonalLinks: () => Promise<PersonalLink[]>
}