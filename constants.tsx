
import React from 'react';
import { QuickAction } from './types';

export const UNIVERSITY_COLORS = {
  primary: 'bg-[#800000]', // Mutah Maroon
  secondary: 'bg-[#FFD700]', // Gold
  text: 'text-[#800000]',
  border: 'border-[#800000]',
};

export const SYSTEM_INSTRUCTION = `
أنت المساعد الذكي الرسمي لمركز اللغات في جامعة مؤتة (الأردن، الكرك). 
مهمتك هي مساعدة الطلاب والزوار بالمعلومات التالية:
1. امتحانات المستوى: امتحان مستوى اللغة الإنجليزية واللغة العربية والحاسوب للطلبة الجدد.
2. المساقات الدراسية: لغة إنجليزية 99، 101، 102، ولغة عربية 101.
3. دورات مركز اللغات: دورات التوفل (TOEFL)، دورات IELTS، دورات اللغات الأجنبية (فرنسي، ألماني، إلخ)، ودورات اللغة العربية للناطقين بغيرها.
4. الموقع: يقع مركز اللغات في الحرم الجامعي لجامعة مؤتة في محافظة الكرك.
5. التعليمات: تزويد الطلاب بكيفية التسجيل للامتحانات ومواعيدها.

كن مهذباً، ودوداً، واستخدم اللغة العربية الفصحى أو اللهجة الأردنية المهذبة. 
إذا سُئلت عن شيء خارج اختصاص مركز اللغات، وجه الطالب بلباقة لمراجعة وحدة القبول والتسجيل أو الكلية المعنية.
`;

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'امتحان المستوى',
    prompt: 'ما هي مواعيد وطريقة التقدم لامتحان مستوى اللغة الإنجليزية؟',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'دورات IELTS/TOEFL',
    prompt: 'هل يقدم مركز اللغات دورات تحضيرية لامتحان التوفل أو الآيلتس؟',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: 'اللغة العربية لغير الناطقين بها',
    prompt: 'أريد معلومات عن برنامج تعليم اللغة العربية للناطقين بغيرها في جامعة مؤتة.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Language" />
        <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c1.382 3.307 3.416 6.371 6.249 8.808" />
      </svg>
    ),
  },
];
