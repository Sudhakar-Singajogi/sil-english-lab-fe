const chapter1 = [
  {
    id: 1,
    title: "Greetings and Introductions",
    icon: `${import.meta.env.BASE_URL}assets/icons/hello-handshake.svg`,
    description: "Learn how to confidently greet people and introduce yourself in English.",
    sections: [
      {
        sectionTitle: "Common Greetings",
        steps: [
          { type: "text", data: "Hello" },
          { type: "text", data: "Hi" },
          { type: "text", data: "Good morning" },
          { type: "text", data: "Good evening" },
          { type: "audio", data: "/assets/audio/hello.mp3" }
        ]
      },
      {
        sectionTitle: "Introducing Yourself",
        steps: [
          { type: "text", data: 'My name is...' },
          { type: "text", data: "It's nice to meet you!" },
          { type: "quiz", data: "Practice: ____! Where are you from?" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Introductions for Groups",
    icon: `${import.meta.env.BASE_URL}assets/icons/hello-handshake.svg`,
    description: "Learn how to confidently greet people and introduce yourself in English.",
    sections: [
      {
        sectionTitle: "Common Greetings",
        steps: [
          { type: "text", data: "Hello" },
          { type: "text", data: "Hi" },
          { type: "text", data: "Good morning" },
          { type: "text", data: "Good evening" },
          { type: "audio", data: "/assets/audio/hello.mp3" }
        ]
      },
      {
        sectionTitle: "Introducing Yourself",
        steps: [
          { type: "text", data: 'My name is...' },
          { type: "text", data: "It's nice to meet you!" },
          { type: "quiz", data: "Practice: ____! Where are you from?" }
        ]
      }
    ]
  }
];

export default chapter1;
