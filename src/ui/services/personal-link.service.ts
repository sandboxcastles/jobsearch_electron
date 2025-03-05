// import axios from 'axios';

import { PersonalLink } from "../models/PersonalLink.model";

export async function getPersonalLinks(): Promise<PersonalLink[]> {
    // const response = await axios.get<PersonalLink[]>('');
    // return response.data;
    return await new Promise<PersonalLink[]>((res) => res([
        { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/nicklandkamer' },
        { id: 'github', label: 'Github', url: 'https://github.com/sandboxcastles' },
        { id: 'website', label: 'Website', url: 'https://www.nicklandkamer.com' },
    ]));
}