/** Super Cut Salon — edit business details here */
export const siteConfig = {
  name: "Super Cut Salon",
  shortName: "Super Cut",
  tagline: "Beauty salon in Wattala",
  googleRating: 4.5126,
  googleReviewCount: 44,
  owner: {
    greetingName: "Super Cut",
    title: "Unisex Salon",
    bio: "A trusted unisex beauty salon on Wattala - Hekitta Rd — haircuts, keratin treatments, styling, and more for both men and women. Professional service, friendly staff, and welcoming atmosphere.",
  },
  location: {
    title: "Find us",
    address: "No 9 Wattala - Hekitta Rd",
    city: "Wattala 11300, Sri Lanka",
    fullAddress: "No 9 Wattala - Hekitta Rd, Wattala 11300, Sri Lanka",
    plusCode: "",
    phone: "072 072 4710",
    phoneTel: "+94720724710",
    mapsUrl: "https://www.google.com/maps/dir//Super+Cut+Salon,+no+9+Wattala+-+Hekitta+Rd,+Wattala+11300/@6.9812436,79.8875788,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3ae259309cfadd19:0x537f9beb761845dd!2m2!1d79.8875788!2d6.9812436?entry=ttu",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.772677267!2d79.88503017588142!3d6.981248893021427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259309cfadd19%3A0x537f9beb761845dd!2sSuper%20Cut%20Salon!5e0!3m2!1sen!2slk!4v1784619600000!5m2!1sen!2slk",
    hours: [
      { days: "Every day", time: "Open until 9:30 PM" },
    ],
    amenities: ["Unisex salon", "A/C available", "Friendly staff", "Professional service"],
  },
};

export type Testimonial = {
  name: string;
  quote: string;
  rating: number;
  timeAgo?: string;
  badge?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Chathurani Perera",
    quote: "I really recommend this saloon. He is very dedicated and taking his time to get the best out come. And treating the client in the very best way. So professional and very punctual to the given appointment! And reasonable prices too.",
    rating: 5,
    timeAgo: "8 months ago",
  },
  {
    name: "Rehana zafar",
    quote: "Excellent service, skilled barber, and a great haircut. Friendly staff and a clean environment. Highly recommended!",
    rating: 5,
    timeAgo: "a month ago",
  },
  {
    name: "Arun Arun",
    quote: "Super Cut Salon exceeded my expectations with their keratin treatment! The team was knowledgeable, attentive, and made sure I was relaxed throughout the process. My hair is now silky, shiny, and manageable — it's like a whole new me!",
    rating: 5,
    timeAgo: "7 months ago",
  },
  {
    name: "L Keerthana",
    quote: "I just got my keratin treatment done at Super Cut Salon and I'm blown away by the amazing service! The staff were professional, friendly, and made me feel super comfortable throughout the process. My hair feels smoother and looks healthier.",
    rating: 5,
    timeAgo: "7 months ago",
  },
  {
    name: "Ragavendra (Psycho)",
    quote: "Super Cut Saloon is amazing! All the staff are super friendly, and the salon has a very welcoming vibe. The boss is also very approachable and kind. Highly recommended for an unisex salon experience. They stay up-to-date with all the latest styles.",
    rating: 5,
    timeAgo: "10 months ago",
    badge: "Local Guide",
  },
  {
    name: "Shakthi Mathan",
    quote: "Excellent Service and Friendly Staff! I had a great experience at Super Cut Saloon, Wattala (Hekitta Road).",
    rating: 5,
    timeAgo: "10 months ago",
  },
  {
    name: "Malathy Sri",
    quote: "Great customer service and quality work! The staff provide excellent service. Mr. Kajan, from the ladies' section, does his job very neatly and professionally.",
    rating: 5,
    timeAgo: "a year ago",
    badge: "Local Guide",
  },
  {
    name: "Anban Shayan",
    quote: "Very Quick and friendly staff who provide nice hair styling services. You can find unisex saloon for Better service.",
    rating: 5,
    timeAgo: "7 months ago",
    badge: "Local Guide",
  },
  {
    name: "Malik Mazhar",
    quote: "Great haircut and very friendly staff.",
    rating: 5,
    timeAgo: "5 months ago",
  },
  {
    name: "Matheesha Thilakarathna",
    quote: "Great service. Very busy place. They are giving a good service and prices are normal. All barbers which I saw giving best haircut as we request. Friendly service.",
    rating: 5,
    timeAgo: "a year ago",
    badge: "Local Guide",
  },
  {
    name: "Abiramy Ganeshwaran",
    quote: "Fantastic service! Kajan does at excellent job at haircuts, head massages and threading! Getting an appointment is quite hectic due to the demand but certainly recommended spot for women! Decent bunch of people as well.",
    rating: 5,
    timeAgo: "5 years ago",
    badge: "Local Guide",
  },
  {
    name: "Malisha Weerasinghe",
    quote: "Grate customer service and amazing beauty surprise for me function. Highly recommended salon super cut for your all hair,makeup.",
    rating: 5,
    timeAgo: "a year ago",
  },
  {
    name: "Ravishan Dushantha",
    quote: "Friendly and good service provided for customers.. Really appreciate for that.. Highly recommend this place and again thank you for your best service.",
    rating: 5,
    timeAgo: "2 years ago",
  },
  {
    name: "Stefoan Bernard",
    quote: "best place, friendly service and good results. Would recommend you to visit. I usually go once every 2 weeks to get a faded and would continue to keep going.",
    rating: 5,
    timeAgo: "4 years ago",
    badge: "Local Guide",
  },
  {
    name: "Srivaxsan Ganeshamoorthy",
    quote: "I recently visited this place and I am very satisfied. Highly recommend super cut saloon.",
    rating: 5,
    timeAgo: "a year ago",
    badge: "Local Guide",
  },
  {
    name: "srini madhavi",
    quote: "Very accommodating and kind hair dresser. Decent and takes time for each client. Did a great job on my short hair.",
    rating: 5,
    timeAgo: "2 years ago",
    badge: "Local Guide",
  },
  {
    name: "Dhanusha Perera",
    quote: "Nice service and friendly staff.",
    rating: 5,
    timeAgo: "8 months ago",
    badge: "Local Guide",
  },
  {
    name: "Jagannivash Sivasanmugam",
    quote: "Good place to have a haircuts. Professional hairdresser and friendly. Usually needs to wait 1.5 hours for your turn.",
    rating: 5,
    timeAgo: "5 years ago",
    badge: "Local Guide",
  },
  {
    name: "Maneesha Senaviratne",
    quote: "Best place for a haircut. Highly recommended. Been going there for 5 years.",
    rating: 5,
    timeAgo: "6 years ago",
    badge: "Local Guide",
  },
  {
    name: "Ashan Fernando",
    quote: "Great saloon and great service ever i seen. Good job.",
    rating: 5,
    timeAgo: "4 years ago",
  },
  {
    name: "Soniya Suganya",
    quote: "Best — I always recommend this saloon, very friendly and best of out look always.",
    rating: 5,
    timeAgo: "3 years ago",
  },
  {
    name: "Karthik Thangavelu",
    quote: "The place is extremely clean and very friendly team as well as very professional.",
    rating: 5,
    timeAgo: "4 years ago",
  },
  {
    name: "Krishan",
    quote: "Best place for gents hair cut. Good customer service. Recommendable.",
    rating: 5,
    timeAgo: "3 years ago",
    badge: "Local Guide",
  },
  {
    name: "V. Diroshan",
    quote: "I used to go more than 5 years. Customer service is good.",
    rating: 5,
    timeAgo: "5 years ago",
    badge: "Local Guide",
  },
  {
    name: "Hasmukh Lal Sharma",
    quote: "Nice and good behaviour of shop keeper and worker.",
    rating: 5,
    timeAgo: "3 years ago",
    badge: "Local Guide",
  },
  {
    name: "Mohamed ishaq lye",
    quote: "Recommend place! Good Customer Care!",
    rating: 5,
    timeAgo: "4 years ago",
  },
  {
    name: "Randika Fernando",
    quote: "Great service. Highly recommended.",
    rating: 5,
    timeAgo: "4 years ago",
    badge: "Local Guide",
  },
  {
    name: "Mirosaan Logeswaran",
    quote: "One of the best salons around Wattala for men!",
    rating: 5,
    timeAgo: "3 years ago",
    badge: "Local Guide",
  },
  {
    name: "Sarath Kumar Vijendram",
    quote: "Good and clean work but expensive.",
    rating: 4,
    timeAgo: "4 years ago",
    badge: "Local Guide",
  },
  {
    name: "NAVA YOGA",
    quote: "Super service friendly staffs.",
    rating: 5,
    timeAgo: "5 years ago",
    badge: "Local Guide",
  },
  {
    name: "ANANTHASAAYI PHAKEERATHAN",
    quote: "Very very professional and friendly approach.",
    rating: 5,
    timeAgo: "5 years ago",
  },
  {
    name: "Thakshala Dilakshani",
    quote: "Good Salon I am for Happy.",
    rating: 5,
    timeAgo: "2 years ago",
  },
  {
    name: "Tharindu Jayawardana",
    quote: "Highly recommended.",
    rating: 5,
    timeAgo: "a year ago",
    badge: "Local Guide",
  },
  {
    name: "Kasun Kalana",
    quote: "Good saloon for unisex at wattala.",
    rating: 5,
    timeAgo: "3 years ago",
    badge: "Local Guide",
  },
  {
    name: "Praneeth Nidarshan",
    quote: "Best price best work.",
    rating: 5,
    timeAgo: "4 years ago",
    badge: "Local Guide",
  },
  {
    name: "Hariharasudan Ravichandran",
    quote: "Friendly staff and clean place.",
    rating: 5,
    timeAgo: "3 years ago",
  },
  {
    name: "David Punchihewa",
    quote: "Very good job.",
    rating: 5,
    timeAgo: "2 years ago",
  },
];

export const faqs = [
  {
    q: "Do I need an appointment?",
    a: "You can walk in during opening hours, or you can book via WhatsApp to reserve your slot! We're open every day until 9:30 PM.",
  },
  {
    q: "Where are you located?",
    a: "No 9 Wattala - Hekitta Rd, Wattala 11300 — easy to find on Google Maps.",
  },
  {
    q: "What services do you offer?",
    a: "Unisex services — haircuts, beard trims, keratin treatments, hair straightening, hair coloring, styling, facials, kids cuts, threading, head massages, and full grooming for both men and women.",
  },
  {
    q: "Do you have a WhatsApp number?",
    a: "Yes! You can reach us on WhatsApp at +94 72 072 4710 for appointments or inquiries.",
  },
];
