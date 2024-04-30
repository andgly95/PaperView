import { Result } from '../app/interfaces/api.interfaces';

export const stubPaper: Result = {
  arxivId: '2301.12345',
  authors: [
    {
      name: 'Author 1',
    },
    {
      name: 'Author 2',
    },
  ],
  contributors: [],
  outputs: ['https://api.core.ac.uk/v3/outputs/1234567890'],
  createdDate: '2023-01-25T10:30:00',
  dataProviders: [
    {
      id: 42,
      name: '',
      url: 'https://api.core.ac.uk/v3/data-providers/42',
      logo: 'https://api.core.ac.uk/data-providers/42/logo',
    },
  ],
  abstract:
    'This mock paper presents a novel approach to autonomous drone navigation using advanced computer vision techniques. The proposed system combines real-time object detection, path planning, and obstacle avoidance to enable drones to safely navigate complex environments. Experimental results demonstrate the effectiveness of the approach in various scenarios. The paper also discusses potential applications and future research directions.',
  documentType: 'research',
  doi: '10.1234/5678',
  downloadUrl: 'https://example.com/download',
  fieldOfStudy: null,
  fullText: 'Full text of the mock paper...',
  id: 987654321,
  identifiers: [
    {
      identifier: '1234567890',
      type: 'CORE_ID',
    },
    {
      identifier: '2301.12345',
      type: 'ARXIV_ID',
    },
    {
      identifier: '10.1234/5678',
      type: 'DOI',
    },
  ],
  title: 'Test Paper',
  language: {
    code: 'en',
    name: 'English',
  },
  magId: null,
  oaiIds: ['oai:arXiv.org:2301.12345'],
  publishedDate: '2023-01-28T00:00:00',
  publisher: 'Test Publisher',
  pubmedId: null,
  references: [],
  sourceFulltextUrls: ['https://arxiv.org/abs/2301.12345'],
  updatedDate: '2023-01-30T14:15:00',
  yearPublished: 2023,
  journals: [],
  links: [
    {
      type: 'download',
      url: 'https://example.com/download',
    },
    {
      type: 'display',
      url: 'https://example.com/display',
    },
  ],
};
