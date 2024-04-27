export interface Author {
  name: string;
}

interface DataProvider {
  id: number;
  name: string;
  url: string;
  logo: string;
}

interface Link {
  type: string;
  url: string;
}

interface Language {
  code: string;
  name: string;
}

export interface Result {
  arxivId: string | null;
  authors: Author[];
  contributors: string[];
  outputs: string[];
  createdDate: string;
  dataProviders: DataProvider[];
  abstract: string;
  documentType: string;
  doi: string | null;
  downloadUrl: string;
  fieldOfStudy: string | null;
  fullText: string;
  id: number;
  identifiers: {
    identifier: string;
    type: string;
  }[];
  title: string;
  language: Language;
  magId: string | null;
  oaiIds: string[];
  publishedDate: string;
  publisher: string;
  pubmedId: string | null;
  references: any[];
  sourceFulltextUrls: string[];
  updatedDate: string;
  yearPublished: number;
  journals: any[];
  links: Link[];
}

export interface APIResponse {
  totalHits: number;
  limit: number;
  offset: number;
  results: Result[];
}
