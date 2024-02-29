import { ConnectionState, TestData } from '../app/store/state';

export function generateTestData(size: number = 2000): TestData[] {
  const testData: TestData[] = [];

  for (let i = 0; i < size; i++) {
    testData.push({
      title: `Item ${i + 1}`,
      status: getRandomStatus(),
      junk1: 'asdf',
      junk2: 'asdf',
    });
  }

  return testData;
}

function getRandomStatus(): ConnectionState {
  const statuses = Object.values(ConnectionState).filter((k) =>
    isNaN(Number(k))
  );
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex] as ConnectionState;
}
