import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Simple translation dictionary
const translations = {
  // English to Nepali
  'en-ne': {
    'Discover amazing events happening across Nepal': 'नेपाल भरमा राम्रा कार्यक्रमहरू फेला पार्नुहोस्',
    'Search events...': 'कार्यक्रम खोज्नुहोस्...',
    'Browse': 'ब्राउज',
    'Book Now': 'अहिले बुक गर्नुहोस्',
    'My Bookings': 'मेरो बुकिङहरू',
    'Contact': 'सम्पर्क',
    'Home': 'गृह',
    'Login / Sign Up': 'लगइन / साइन अप',
    'Logout': 'लगआउट',
    'Admin': 'एडमिन',
    'Experience an amazing event with great performances and entertainment.': 'राम्रा प्रदर्शन र मनोरञ्जनको साथ अद्भुत कार्यक्रमको अनुभव लिनुहोस्।',
    'The biggest Nepali music festival featuring top artists from across the country. Experience an unforgettable night of music, culture, and entertainment.': 'देशभरका शीर्ष कलाकारहरूको साथ सबैभन्दा ठूलो नेपाली संगीत महोत्सव। संगीत, संस्कृति र मनोरञ्जनको अविस्मरणीय रातको अनुभव लिनुहोस्।',
    'Ready to Book?': 'बुक गर्न तयार हुनुहुन्छ?',
    'Secure your spot for this amazing event': 'यो अद्भुत कार्यक्रमको लागि आफ्नो स्थान सुरक्षित गर्नुहोस्',
    'Book Now': 'अहिले बुक गर्नुहोस्',
    'Secure booking with eSewa & Khalti': 'eSewa र Khalti सँग सुरक्षित बुकिङ',
    'Back to Events': 'कार्यक्रमहरूमा फर्कनुहोस्',
    'About This Event': 'यो कार्यक्रमको बारेमा',
    'Featured Artists': 'विशेष कलाकारहरू',
    'What to Expect': 'के आशा गर्ने',
    'Venue Information': 'स्थानको जानकारी',
    'Important Notes': 'महत्वपूर्ण नोटहरू',
    'Quick Info': 'छिटो जानकारी',
    'Category': 'श्रेणी',
    'Duration': 'अवधि',
    'Age Limit': 'उमेर सीमा',
    'Language': 'भाषा',
    'All ages': 'सबै उमेर',
    'Nepali': 'नेपाली',
    'English': 'अंग्रेजी',
    'Concert': 'संगीत कार्यक्रम',
    'Comedy': 'हास्य',
    'Cultural': 'सांस्कृतिक',
    'Movie': 'चलचित्र',
    'Sports': 'खेलकुद',
    'View Details': 'विवरण हेर्नुहोस्',
    'General Admission': 'सामान्य प्रवेश',
    'VIP Seating': 'वीआईपी बस्ने',
    'Premium Package': 'प्रीमियम प्याकेज',
    'Select Tickets': 'टिकट छान्नुहोस्',
    'Quantity': 'मात्रा',
    'Total Amount': 'कुल रकम',
    'Proceed to Checkout': 'चेकआउटमा जानुहोस्',
    'Please select at least one ticket.': 'कम्तिमा एउटा टिकट छान्नुहोस्।',
    'Please fill in all required fields.': 'सबै आवश्यक फिल्डहरू भर्नुहोस्।',
    'Event Not Found': 'कार्यक्रम फेला परेन',
    'No Event Data': 'कार्यक्रम डाटा छैन',
    'Please log in to continue': 'जारी राख्न लगइन गर्नुहोस्',
    'Redirecting to login page...': 'लगइन पृष्ठमा पुनर्निर्देशन गर्दै...',
    'Loading event...': 'कार्यक्रम लोड गर्दै...',
    'Loading events...': 'कार्यक्रमहरू लोड गर्दै...',
    'No events found matching your criteria.': 'तपाईंको मापदण्डसँग मेल खाने कुनै कार्यक्रम फेला परेन।',
    'Clear Filters': 'फिल्टरहरू सफा गर्नुहोस्',
    'All Categories': 'सबै श्रेणीहरू',
    'All Cities': 'सबै शहरहरू',
    'Showing': 'देखाइँदै',
    'of': 'मध्ये',
    'events': 'कार्यक्रमहरू',
    'Book Tickets': 'टिकट बुक गर्नुहोस्',
    'Select Tickets': 'टिकट छान्नुहोस्',
    'Quantity': 'मात्रा',
    'Customer Information': 'ग्राहक जानकारी',
    'Full Name *': 'पूरा नाम *',
    'Enter your full name': 'आफ्नो पूरा नाम लेख्नुहोस्',
    'Email Address *': 'इमेल ठेगाना *',
    'Enter your email': 'आफ्नो इमेल लेख्नुहोस्',
    'Phone Number *': 'फोन नम्बर *',
    'Enter your phone number': 'आफ्नो फोन नम्बर लेख्नुहोस्',
    'City': 'शहर',
    'Select your city': 'आफ्नो शहर छान्नुहोस्',
    'Kathmandu': 'काठमाडौं',
    'Pokhara': 'पोखरा',
    'Lalitpur': 'ललितपुर',
    'Bhaktapur': 'भक्तपुर',
    'Order Summary': 'अर्डर सारांश',
    'Select tickets to see order summary': 'अर्डर सारांश हेर्न टिकट छान्नुहोस्',
    'Qty:': 'संख्या:',
    'Total Tickets': 'कुल टिकट',
    'Total Amount': 'कुल रकम',
    'Proceed to Checkout': 'चेकआउटमा जानुहोस्',
    'Secure payment with eSewa & Khalti': 'eSewa र Khalti सँग सुरक्षित भुक्तानी',
    '← Back to Event Details': '← कार्यक्रम विवरणमा फर्कनुहोस्',
    'No Event Data': 'कार्यक्रम डाटा छैन',
    'Back to Events': 'कार्यक्रमहरूमा फर्कनुहोस्',
    'Please log in to continue': 'जारी राख्न लगइन गर्नुहोस्',
    'Redirecting to login page...': 'लगइन पृष्ठमा पुनर्निर्देशन गर्दै...',
    'Please select at least one ticket.': 'कम्तिमा एउटा टिकट छान्नुहोस्।',
    'Please fill in all required fields.': 'सबै आवश्यक फिल्डहरू भर्नुहोस्।'
  },
  // English to Hindi
  'en-hi': {
    'Discover amazing events happening across Nepal': 'नेपाल भर में हो रहे अद्भुत कार्यक्रमों की खोज करें',
    'Search events...': 'कार्यक्रम खोजें...',
    'Browse': 'ब्राउज़',
    'Book Now': 'अभी बुक करें',
    'My Bookings': 'मेरी बुकिंग',
    'Contact': 'संपर्क',
    'Home': 'होम',
    'Login / Sign Up': 'लॉगिन / साइन अप',
    'Logout': 'लॉगआउट',
    'Admin': 'एडमिन',
    'Experience an amazing event with great performances and entertainment.': 'शानदार प्रदर्शन और मनोरंजन के साथ एक अद्भुत कार्यक्रम का अनुभव करें।',
    'The biggest Nepali music festival featuring top artists from across the country. Experience an unforgettable night of music, culture, and entertainment.': 'देश भर के शीर्ष कलाकारों के साथ सबसे बड़ा नेपाली संगीत महोत्सव। संगीत, संस्कृति और मनोरंजन की अविस्मरणीय रात का अनुभव करें।',
    'Ready to Book?': 'बुक करने के लिए तैयार?',
    'Secure your spot for this amazing event': 'इस अद्भुत कार्यक्रम के लिए अपनी जगह सुरक्षित करें',
    'Book Now': 'अभी बुक करें',
    'Secure booking with eSewa & Khalti': 'eSewa और Khalti के साथ सुरक्षित बुकिंग',
    'Back to Events': 'कार्यक्रमों पर वापस जाएं',
    'About This Event': 'इस कार्यक्रम के बारे में',
    'Featured Artists': 'विशेष कलाकार',
    'What to Expect': 'क्या उम्मीद करें',
    'Venue Information': 'स्थान की जानकारी',
    'Important Notes': 'महत्वपूर्ण नोट्स',
    'Quick Info': 'त्वरित जानकारी',
    'Category': 'श्रेणी',
    'Duration': 'अवधि',
    'Age Limit': 'आयु सीमा',
    'Language': 'भाषा',
    'All ages': 'सभी आयु',
    'Nepali': 'नेपाली',
    'English': 'अंग्रेजी',
    'Concert': 'संगीत कार्यक्रम',
    'Comedy': 'कॉमेडी',
    'Cultural': 'सांस्कृतिक',
    'Movie': 'फिल्म',
    'Sports': 'खेल',
    'View Details': 'विवरण देखें',
    'General Admission': 'सामान्य प्रवेश',
    'VIP Seating': 'वीआईपी बैठक',
    'Premium Package': 'प्रीमियम पैकेज',
    'Select Tickets': 'टिकट चुनें',
    'Quantity': 'मात्रा',
    'Total Amount': 'कुल राशि',
    'Proceed to Checkout': 'चेकआउट पर जाएं',
    'Please select at least one ticket.': 'कृपया कम से कम एक टिकट चुनें।',
    'Please fill in all required fields.': 'कृपया सभी आवश्यक फील्ड भरें।',
    'Event Not Found': 'कार्यक्रम नहीं मिला',
    'No Event Data': 'कोई कार्यक्रम डेटा नहीं',
    'Please log in to continue': 'जारी रखने के लिए कृपया लॉगिन करें',
    'Redirecting to login page...': 'लॉगिन पेज पर पुनर्निर्देशित कर रहा है...',
    'Loading event...': 'कार्यक्रम लोड हो रहा है...',
    'Loading events...': 'कार्यक्रम लोड हो रहे हैं...',
    'No events found matching your criteria.': 'आपकी कसौटी से मेल खाने वाला कोई कार्यक्रम नहीं मिला।',
    'Clear Filters': 'फिल्टर साफ करें',
    'All Categories': 'सभी श्रेणियां',
    'All Cities': 'सभी शहर',
    'Showing': 'दिखा रहा है',
    'of': 'में से',
    'events': 'कार्यक्रम',
    'Book Tickets': 'टिकट बुक करें',
    'Select Tickets': 'टिकट चुनें',
    'Quantity': 'मात्रा',
    'Customer Information': 'ग्राहक जानकारी',
    'Full Name *': 'पूरा नाम *',
    'Enter your full name': 'अपना पूरा नाम लिखें',
    'Email Address *': 'ईमेल पता *',
    'Enter your email': 'अपना ईमेल लिखें',
    'Phone Number *': 'फोन नंबर *',
    'Enter your phone number': 'अपना फोन नंबर लिखें',
    'City': 'शहर',
    'Select your city': 'अपना शहर चुनें',
    'Kathmandu': 'काठमांडू',
    'Pokhara': 'पोखरा',
    'Lalitpur': 'ललितपुर',
    'Bhaktapur': 'भक्तपुर',
    'Order Summary': 'ऑर्डर सारांश',
    'Select tickets to see order summary': 'ऑर्डर सारांश देखने के लिए टिकट चुनें',
    'Qty:': 'संख्या:',
    'Total Tickets': 'कुल टिकट',
    'Total Amount': 'कुल राशि',
    'Proceed to Checkout': 'चेकआउट पर जाएं',
    'Secure payment with eSewa & Khalti': 'eSewa और Khalti के साथ सुरक्षित भुगतान',
    '← Back to Event Details': '← इवेंट विवरण पर वापस जाएं',
    'No Event Data': 'कोई इवेंट डेटा नहीं',
    'Back to Events': 'इवेंट्स पर वापस जाएं',
    'Please log in to continue': 'जारी रखने के लिए कृपया लॉगिन करें',
    'Redirecting to login page...': 'लॉगिन पेज पर पुनर्निर्देशित कर रहा है...',
    'Please select at least one ticket.': 'कृपया कम से कम एक टिकट चुनें।',
    'Please fill in all required fields.': 'कृपया सभी आवश्यक फील्ड भरें।'
  },
  // English to Bengali
  'en-bn': {
    'Discover amazing events happening across Nepal': 'নেপাল জুড়ে ঘটছে আশ্চর্যজনক ইভেন্টগুলি আবিষ্কার করুন',
    'Search events...': 'ইভেন্টগুলি খুঁজুন...',
    'Browse': 'ব্রাউজ',
    'Book Now': 'এখনই বুক করুন',
    'My Bookings': 'আমার বুকিংগুলি',
    'Contact': 'যোগাযোগ',
    'Home': 'হোম',
    'Login / Sign Up': 'লগইন / সাইন আপ',
    'Logout': 'লগআউট',
    'Admin': 'অ্যাডমিন',
    'Experience an amazing event with great performances and entertainment.': 'দারুণ পারফরম্যান্স এবং বিনোদনের সাথে একটি আশ্চর্যজনক ইভেন্টের অভিজ্ঞতা নিন।',
    'The biggest Nepali music festival featuring top artists from across the country. Experience an unforgettable night of music, culture, and entertainment.': 'দেশ জুড়ে শীর্ষস্থানীয় শিল্পীদের সাথে সবচেয়ে বড় নেপালি সঙ্গীত উৎসব। সঙ্গীত, সংস্কৃতি এবং বিনোদনের একটি অবিস্মরণীয় রাতের অভিজ্ঞতা নিন।',
    'Ready to Book?': 'বুক করার জন্য প্রস্তুত?',
    'Secure your spot for this amazing event': 'এই আশ্চর্যজনক ইভেন্টের জন্য আপনার স্থান সুरক্ষিত করুন',
    'Book Now': 'এখনই বুক করুন',
    'Secure booking with eSewa & Khalti': 'eSewa এবং Khalti দিয়ে নিরাপদ বুকিং',
    'Back to Events': 'ইভেন্টগুলিতে ফিরে যান',
    'About This Event': 'এই ইভেন্ট সম্পর্কে',
    'Featured Artists': 'বৈশিষ্ট্যযুক্ত শিল্পীরা',
    'What to Expect': 'কী আশা করা যায়',
    'Venue Information': 'ভেন্যু তথ্য',
    'Important Notes': 'গুরুত্বপূর্ণ নোটগুলি',
    'Quick Info': 'দ্রুত তথ্য',
    'Category': 'বিভাগ',
    'Duration': 'সময়কাল',
    'Age Limit': 'বয়স সীমা',
    'Language': 'ভাষা',
    'All ages': 'সব বয়স',
    'Nepali': 'নেপালি',
    'English': 'ইংরেজি',
    'Concert': 'কনসার্ট',
    'Comedy': 'কমেডি',
    'Cultural': 'সাংস্কৃতিক',
    'Movie': 'সিনেমা',
    'Sports': 'ক্রীড়া',
    'View Details': 'বিস্তারিত দেখুন',
    'General Admission': 'সাধারণ প্রবেশ',
    'VIP Seating': 'ভিআইপি আসন',
    'Premium Package': 'প্রিমিয়াম প্যাকেজ',
    'Select Tickets': 'টিকিট নির্বাচন করুন',
    'Quantity': 'পরিমাণ',
    'Total Amount': 'মোট পরিমাণ',
    'Proceed to Checkout': 'চেকআউটে যান',
    'Please select at least one ticket.': 'অন্তত একটি টিকিট নির্বাচন করুন।',
    'Please fill in all required fields.': 'সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন।',
    'Event Not Found': 'ইভেন্ট পাওয়া যায়নি',
    'No Event Data': 'কোন ইভেন্ট ডেটা নেই',
    'Please log in to continue': 'চালিয়ে যেতে লগইন করুন',
    'Redirecting to login page...': 'লগইন পৃষ্ঠায় পুনর্নির্দেশিত হচ্ছে...',
    'Loading event...': 'ইভেন্ট লোড হচ্ছে...',
    'Loading events...': 'ইভেন্টগুলি লোড হচ্ছে...',
    'No events found matching your criteria.': 'আপনার মানদণ্ডের সাথে মিলে এমন কোন ইভেন্ট পাওয়া যায়নি।',
    'Clear Filters': 'ফিল্টার সাফ করুন',
    'All Categories': 'সব বিভাগ',
    'All Cities': 'সব শহর',
    'Showing': 'দেখাচ্ছে',
    'of': 'এর মধ্যে',
    'events': 'ইভেন্ট',
    'Book Tickets': 'টিকিট বুক করুন',
    'Select Tickets': 'টিকিট নির্বাচন করুন',
    'Quantity': 'পরিমাণ',
    'Customer Information': 'গ্রাহক তথ্য',
    'Full Name *': 'পূর্ণ নাম *',
    'Enter your full name': 'আপনার পূর্ণ নাম লিখুন',
    'Email Address *': 'ইমেইল ঠিকানা *',
    'Enter your email': 'আপনার ইমেইল লিখুন',
    'Phone Number *': 'ফোন নম্বর *',
    'Enter your phone number': 'আপনার ফোন নম্বর লিখুন',
    'City': 'শহর',
    'Select your city': 'আপনার শহর নির্বাচন করুন',
    'Kathmandu': 'কাঠমান্ডু',
    'Pokhara': 'পোখারা',
    'Lalitpur': 'ললিতপুর',
    'Bhaktapur': 'ভক্তপুর',
    'Order Summary': 'অর্ডার সারাংশ',
    'Select tickets to see order summary': 'অর্ডার সারাংশ দেখতে টিকিট নির্বাচন করুন',
    'Qty:': 'পরিমাণ:',
    'Total Tickets': 'মোট টিকিট',
    'Total Amount': 'মোট পরিমাণ',
    'Proceed to Checkout': 'চেকআউটে যান',
    'Secure payment with eSewa & Khalti': 'eSewa এবং Khalti দিয়ে নিরাপদ পেমেন্ট',
    '← Back to Event Details': '← ইভেন্ট বিস্তারিত ফিরে যান',
    'No Event Data': 'কোনো ইভেন্ট ডেটা নেই',
    'Back to Events': 'ইভেন্টে ফিরে যান',
    'Please log in to continue': 'চালিয়ে যেতে লগইন করুন',
    'Redirecting to login page...': 'লগইন পৃষ্ঠায় পুনর্নির্দেশিত হচ্ছে...',
    'Please select at least one ticket.': 'অন্তত একটি টিকিট নির্বাচন করুন।',
    'Please fill in all required fields.': 'সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন।'
  }
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  // Simple translation function using dictionary
  const translateText = async (text, targetLang) => {
    if (!text || targetLang === 'en') return text;
    
    const translationKey = `en-${targetLang}`;
    const translationDict = translations[translationKey];
    
    if (translationDict && translationDict[text]) {
      return translationDict[text];
    }
    
    return text; // Return original text if no translation found
  };

  // Translate multiple texts
  const translateMultiple = async (texts, targetLang) => {
    if (targetLang === 'en') return texts;
    
    setIsTranslating(true);
    try {
      const translatedTexts = {};
      for (const [key, text] of Object.entries(texts)) {
        if (text) {
          translatedTexts[key] = await translateText(text, targetLang);
        }
      }
      setIsTranslating(false);
      return translatedTexts;
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
      return texts;
    }
  };

  // Change language
  const changeLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const value = {
    selectedLanguage,
    changeLanguage,
    languages,
    translateText,
    translateMultiple,
    isTranslating
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 