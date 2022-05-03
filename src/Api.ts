import {gql} from 'graphql-request';

export const queryBugs = gql`
  query queryBugs {
    bugs {
      id
      year
      cveId
      product
      vulnerability
      bugReport {
        slug
      }
    }
  }
`;

export const queryBugReport = gql`
  query queryBugReport($slug: String!) {
    bugReport(where: {slug: $slug}) {
      id
      author {
        id
        name
        biography
        picture {
          url
        }
      }
      title
      content
    }
  }
`;

export const queryAllSlugs = gql`
  query queryAllSlugs {
    bugReports {
      slug
    }
  }
`;
