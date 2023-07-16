export const coinList = [
  {
    id: 1,
    code: 'BTC',
    price: 10123.523
  },
  {
    id: 2,
    code: 'ETH',
    price: 234.56
  },
  {
    id: 3,
    code: 'XRP',
    price: 0.345
  },
  {
    id: 4,
    code: 'LTC',
    price: 123.45
  },
  {
    id: 5,
    code: 'ADA',
    price: 0.123
  },
  {
    id: 6,
    code: 'XLM',
    price: 0.078
  },
  {
    id: 7,
    code: 'DOGE',
    price: 0.056
  },
  {
    id: 8,
    code: 'LINK',
    price: 56.789
  },
  {
    id: 9,
    code: 'BNB',
    price: 345.67
  },
  {
    id: 10,
    code: 'EOS',
    price: 4.567
  }
];

export const userList = [
  {
    id: 1,
    email: 'random.email@mail.com'
  },
  {
    id: 2,
    email: 'example@gmail.com'
  },
  {
    id: 3,
    email: 'john.doe@yahoo.com'
  },
  {
    id: 4,
    email: 'testuser@hotmail.com'
  },
  {
    id: 5,
    email: 'jane_smith@outlook.com'
  }
];

export const walletList = [
  {
    id: 1,
    name: 'safe investment',
    user: userList[0]
  },
  {
    id: 2,
    name: 'risky investment',
    user: userList[0]
  },
  {
    id: 3,
    name: 'safe investment',
    user: userList[1]
  },
  {
    id: 4,
    name: 'risky investment',
    user: userList[1]
  }
];

export const coinOnWalletList = [
  {
    id: 1,
    quantity: 10,
    coin: coinList[1],
    wallet: walletList[0]
  },
  {
    id: 2,
    quantity: 5,
    coin: coinList[2],
    wallet: walletList[0]
  },
  {
    id: 3,
    quantity: 20,
    coin: coinList[4],
    wallet: walletList[0]
  },
  {
    id: 4,
    quantity: 15,
    coin: coinList[3],
    wallet: walletList[1]
  },
  {
    id: 5,
    quantity: 8,
    coin: coinList[6],
    wallet: walletList[1]
  },
  {
    id: 6,
    quantity: 12,
    coin: coinList[9],
    wallet: walletList[2]
  },
  {
    id: 7,
    quantity: 3,
    coin: coinList[8],
    wallet: walletList[2]
  },
  {
    id: 8,
    quantity: 7,
    coin: coinList[5],
    wallet: walletList[3]
  }
];
