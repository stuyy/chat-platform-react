export type Theme = {
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  userSidebar: {
    backgroundColor: string;
    color: string;
  };
  conversationSidebar: {
    backgroundColor: string;
    color: string;
    conversationItem: {
      selected: string;
      hover: {
        backgroundColor: string;
      };
      title: {
        color: string;
        lastMessageColor: string;
      };
    };
  };
  messagePanel: {
    backgroundColor: string;
    color: string;
    header: {
      title: string;
    };
    body: {
      content: {
        color: string;
      };
    };
    inputContainer: {
      backgroundColor: string;
      color: string;
    };
  };
  participantSidebar: {
    backgroundColor: string;
    color: string;
  };
  page: {
    backgroundColor: string;
  };
  input: {
    backgroundColor: string;
    color: string;
  };
};

export const DarkTheme: Theme = {
  background: {
    primary: '#0b0b0b',
    secondary: '#111',
    tertiary: '#141414',
  },
  text: {
    primary: '#fff',
    secondary: '#5f5f5f',
  },
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
  input: {
    backgroundColor: '#202020',
    color: '#fff',
  },
};

export const LightTheme: Theme = {
  background: {
    primary: '#C1C1C1',
    secondary: '#fff',
    tertiary: '#ededed',
  },
  text: {
    primary: '#000',
    secondary: '#636363',
  },
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
  input: {
    backgroundColor: '#ececec',
    color: '#595959',
  },
};

// export const PurpleTheme: Theme = {
//   userSidebar: {
//     backgroundColor: '#1E1236',
//     color: '#fff',
//   },
//   conversationSidebar: {
//     backgroundColor: '#443762',
//     color: '#fff',
//     conversationItem: {
//       selected: '#8973BA',
//       hover: {
//         backgroundColor: '#352B4E',
//       },
//       title: {
//         color: '#000',
//         lastMessageColor: '#636363',
//       },
//     },
//   },
//   messagePanel: {
//     backgroundColor: '#3A2E59',
//     color: '#fff',
//     header: {
//       title: '#fff',
//     },
//     body: {
//       content: {
//         color: '#E3E3E3',
//       },
//     },
//     inputContainer: {
//       backgroundColor: '#4C4364',
//       color: '#000',
//     },
//   },
//   participantSidebar: {
//     backgroundColor: '#fff',
//     color: '#000',
//   },
//   page: {
//     backgroundColor: '#fff',
//   },
//   input: {
//     backgroundColor: '#54486D',
//     color: '#fff',
//   },
// };
