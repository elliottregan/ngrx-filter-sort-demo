import { SortOptions, TestData } from '../app/store/testData';

export function filterBy(
  data: TestData[],
  property: keyof TestData,
  query: string,
) {
  return query
    ? data.filter((item) =>
        item[property].toLowerCase().includes(query.toLowerCase()),
      )
    : data;
}

export function sortTestData(
  data: TestData[],
  params: { [x: string]: any; sortDir?: any; sortCol?: any },
): TestData[] {
  console.log('sortTestData', data, params)
  const { sortDir, sortCol } = params;
  return [...data].sort((a, b) => {
    const colKeys = Object.keys(a) as Array<keyof TestData>;
    const colKey = colKeys[+sortCol || 0];
    const propA = a[colKey].toLowerCase();
    const propB = b[colKey].toLowerCase();

    if (sortDir === SortOptions.ASCENDING) {
      return propA < propB ? -1 : propA > propB ? 1 : 0;
    } else {
      return propA > propB ? -1 : propA < propB ? 1 : 0;
    }
  });
}

export function pageData(
  data: TestData[],
  pageSize: number,
  pageIndex: number,
): TestData[] {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}
