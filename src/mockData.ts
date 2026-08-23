import { TranscriptLine, AssessmentWord } from './types';

export const MOCK_TRANSCRIPT: TranscriptLine[] = [
  {
    timestamp: '0:00',
    text: 'Hi everyone, and welcome to this lesson on money.',
    ipa: '/haɪ ˈɛvrɪwʌn, ænd ˈwɛlkəm tuː ðɪs ˈlɛsn ɒn ˈmʌni/',
    translation: 'Chào mọi người, và chào mừng đến với bài học về tiền bạc.',
    chunkIndex: 0
  },
  {
    timestamp: '0:04',
    text: 'Welcome to this A1 English listening practice video.',
    ipa: '/ˈwɛlkəm tuː ðɪs eɪ-wʌn ˈɪŋɡlɪʃ ˈlɪsnɪŋ ˈpræktɪs ˈvɪdiˌoʊ/',
    translation: 'Chào mừng bạn đến với video thực hành nghe tiếng Anh trình độ A1 này.',
    chunkIndex: 1
  },
  {
    timestamp: '0:09',
    text: 'Today, we will learn about common terms used in banking.',
    ipa: '/təˈdeɪ, wiː wɪl lɜːn əˈbaʊt ˈkɒmən tɜːmz juːzd ɪn ˈbæŋkɪŋ/',
    translation: 'Hôm nay, chúng ta sẽ tìm hiểu về các thuật ngữ phổ biến được sử dụng trong ngân hàng.',
    chunkIndex: 2
  },
  {
    timestamp: '0:14',
    text: 'Let\'s start with how to open a bank account.',
    ipa: '/lɛts stɑːt wɪð haʊ tuː ˈəʊpən ə bæŋk əˈkaʊnt/',
    translation: 'Hãy bắt đầu với cách mở tài khoản ngân hàng.',
    chunkIndex: 3
  }
];

export const MOCK_ASSESSMENT_WORDS: AssessmentWord[] = [
  { text: 'welcome', isCorrect: true },
  { text: 'to', isCorrect: true },
  { text: 'this', isCorrect: true },
  { text: 'a1', isCorrect: false, ipa: '/eɪ-wʌn/' },
  { text: 'english', isCorrect: false, ipa: '/ˈɪŋɡlɪʃ/' },
  { text: 'listening', isCorrect: false, ipa: '/ˈlɪsnɪŋ/' },
  { text: 'practice', isCorrect: true },
  { text: 'video', isCorrect: true },
];
