import { ConnectionState, TestData } from '../app/store/state';
import { faker } from '@faker-js/faker';

export function generateTestData(size: number = 2000): TestData[] {
  const testData: TestData[] = [];

  for (let i = 0; i < size; i++) {
    const fakeUser = generateUserDataArray();
    testData.push({
      title: `${fakeUser.address.line1} ${fakeUser.address.city}, ${fakeUser.address.state}`,
      status: fakeUser.service[0].operationalStatus,
      junk1: 'asdf',
      junk2: 'asdf',
    });
  }

  return testData;
}

function getRandomStatus(): ConnectionState {
  const statuses = Object.values(ConnectionState).filter((k) =>
    isNaN(Number(k)),
  );
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex] as ConnectionState;
}

function generateUserDataArray() {
  return {
    address: {
      line1: faker.location.streetAddress(),
      line2: '',
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zip: faker.location.zipCode(),
    },
    service: [
      {
        name: 'bulkWifi',
        operationalStatus: getRandomStatus(),
        macAddress: faker.internet.mac(),
      },
    ],
    accountnumber: faker.finance.account(),
    cAliasId: faker.datatype.uuid().slice(0, 8),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}
