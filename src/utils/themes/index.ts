import { Theme } from '../types';

export const DarkTheme: Theme = {
  userSidebar: {
    backgroundColor: '#0b0b0b',
    color: '#fff',
  },
  conversationSidebar: {
    backgroundColor: '#111',
    color: '#fff',
    conversationItem: {
      selected: '#1a1a1a',
      hover: {
        backgroundColor: '#222',
      },
      title: {
        color: '#fff',
        lastMessageColor: '#515151',
      },
    },
  },
  messagePanel: {
    backgroundColor: '#141414',
    color: '#fff',
    header: {
      title: '#fff',
    },
    body: {
      content: {
        color: '#fff',
      },
    },
    inputContainer: {
      backgroundColor: '#101010',
      color: '#fff',
    },
  },
  participantSidebar: {
    backgroundColor: '#111',
    color: '#fff',
  },
  page: {
    backgroundColor: '#1a1a1a',
  },
};

export const LightTheme: Theme = {
  userSidebar: {
    backgroundColor: '#15161E',
    color: '#fff',
  },
  conversationSidebar: {
    backgroundColor: '#fff',
    color: '#000',
    conversationItem: {
      selected: '#D1D1D1',
      hover: {
        backgroundColor: '#D8D8D8',
      },
      title: {
        color: '#000',
        lastMessageColor: '#636363',
      },
    },
  },
  messagePanel: {
    backgroundColor: '#ededed',
    color: '#fff',
    header: {
      title: '#000',
    },
    body: {
      content: {
        color: '#000',
      },
    },
    inputContainer: {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
  participantSidebar: {
    backgroundColor: '#fff',
    color: '#000',
  },
  page: {
    backgroundColor: '#fff',
  },
};
