// import axios from 'axios';

export async function getCoverLetterParagraphs(): Promise<string[]> {
    // const response = await axios.get<PersonalLink[]>('');
    // return response.data;
    return await new Promise<string[]>((res) => res([
        'Dear Hiring Manager at {companyName},',
        "I am excited to apply for the {role} role{jobListingLocation}. I look forward to the opportunity to bring my 10 years of experience in {experienceIn} to your team.",
        "In previous jobs, I have strived to create the most efficient code possible, keeping readability and developer experience in mind.{jobSpecificQualifications}",
        "Beyond my technical skills, I enjoy mentoring other developers and working in a team-focused, altruistic environment. I am comfortable collaborating with frontend developers, backend developers, UX designers, product managers, clients, and CEOs, and love working with people in general.",
        "I would truly appreciate the opportunity to speak with you about how my skills align with your needs and how {companyName} can support my professional goals as well. Thank you for your time and consideration. I look forward to hearing from you!",
        'Thank you,',
        '{firstName} {lastName}\r\n{email}\r\n{phoneNumber}\r\n{city}, {state} {zip}'
      ]));
}