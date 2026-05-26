import { PrismaClient, CollegeType, CourseLevel } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  {
    name: 'National Institute of Technology Tiruchirappalli',
    slug: 'nit-trichy',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    type: CollegeType.GOVERNMENT,
    establishedYear: 1964,
    overview:
      'A premier public technical institute known for engineering, architecture, research, and strong national placements.',
    accreditation: 'Institute of National Importance',
    rating: 4.8,
    averageFees: 175000,
    placement: {
      placementRate: 92.5,
      averagePackageLpa: 14.7,
      highestPackageLpa: 52.0,
      topRecruiters: ['Google', 'Microsoft', 'Tata Steel', 'Larsen & Toubro']
    },
    courses: [
      {
        name: 'B.Tech Computer Science and Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 180000,
        totalSeats: 120
      },
      {
        name: 'B.Arch',
        stream: 'Architecture',
        level: CourseLevel.UG,
        duration: '5 years',
        annualFees: 165000,
        totalSeats: 80
      }
    ],
    reviews: [
      {
        authorName: 'Ananya Rao',
        rating: 4.8,
        title: 'Excellent academics and placements',
        body: 'The curriculum is demanding, but the peer group and placement support make it worth it.'
      }
    ],
    cutoffs: [
      {
        examCode: 'jee-main',
        courseName: 'B.Tech Computer Science and Engineering',
        openingRank: 200,
        closingRank: 1200
      }
    ]
  },
  {
    name: 'Vellore Institute of Technology',
    slug: 'vit-vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    type: CollegeType.PRIVATE,
    establishedYear: 1984,
    overview:
      'A large private university with broad engineering programs, modern infrastructure, and strong industry ties.',
    accreditation: 'NAAC A++',
    rating: 4.4,
    averageFees: 198000,
    placement: {
      placementRate: 88.0,
      averagePackageLpa: 9.8,
      highestPackageLpa: 45.0,
      topRecruiters: ['Amazon', 'Deloitte', 'Infosys', 'TCS']
    },
    courses: [
      {
        name: 'B.Tech Computer Science and Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 198000,
        totalSeats: 600
      },
      {
        name: 'B.Tech Electronics and Communication Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 185000,
        totalSeats: 420
      }
    ],
    reviews: [
      {
        authorName: 'Rohit Menon',
        rating: 4.3,
        title: 'Great campus life',
        body: 'A big campus with many opportunities, especially if you are proactive about projects.'
      }
    ],
    cutoffs: [
      {
        examCode: 'viteee',
        courseName: 'B.Tech Computer Science and Engineering',
        openingRank: 1,
        closingRank: 8000
      }
    ]
  },
  {
    name: 'College of Engineering Pune',
    slug: 'coep-pune',
    city: 'Pune',
    state: 'Maharashtra',
    type: CollegeType.GOVERNMENT,
    establishedYear: 1854,
    overview:
      "One of India's oldest engineering institutions with a strong alumni network and high industry recognition.",
    accreditation: 'Autonomous',
    rating: 4.6,
    averageFees: 115000,
    placement: {
      placementRate: 86.5,
      averagePackageLpa: 11.2,
      highestPackageLpa: 50.5,
      topRecruiters: ['Bajaj Auto', 'Accenture', 'Siemens', 'Oracle']
    },
    courses: [
      {
        name: 'B.Tech Mechanical Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 105000,
        totalSeats: 120
      },
      {
        name: 'B.Tech Computer Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 125000,
        totalSeats: 120
      }
    ],
    reviews: [
      {
        authorName: 'Sneha Kulkarni',
        rating: 4.5,
        title: 'Strong ROI',
        body: 'Fees are manageable and placements are consistently good for core and software branches.'
      }
    ],
    cutoffs: [
      {
        examCode: 'mht-cet',
        courseName: 'B.Tech Computer Engineering',
        openingRank: 50,
        closingRank: 1800
      }
    ]
  },
  {
    name: 'Manipal Institute of Technology',
    slug: 'mit-manipal',
    city: 'Manipal',
    state: 'Karnataka',
    type: CollegeType.PRIVATE,
    establishedYear: 1957,
    overview:
      'A private engineering institute with a residential campus, interdisciplinary culture, and balanced student outcomes.',
    accreditation: 'NAAC A++',
    rating: 4.2,
    averageFees: 325000,
    placement: {
      placementRate: 82.0,
      averagePackageLpa: 8.9,
      highestPackageLpa: 44.0,
      topRecruiters: ['IBM', 'Philips', 'Cisco', 'Capgemini']
    },
    courses: [
      {
        name: 'B.Tech Data Science and Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 340000,
        totalSeats: 180
      }
    ],
    reviews: [
      {
        authorName: 'Kabir Shah',
        rating: 4.1,
        title: 'Good exposure',
        body: 'The environment supports clubs, research, and startup activity along with regular academics.'
      }
    ],
    cutoffs: [
      {
        examCode: 'met',
        courseName: 'B.Tech Data Science and Engineering',
        openingRank: 1000,
        closingRank: 9500
      }
    ]
  },
  {
    name: 'Indian Institute of Technology Bombay',
    slug: 'iit-bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: CollegeType.GOVERNMENT,
    establishedYear: 1958,
    overview:
      'A top-ranked public technical institute with deep research output, selective admissions, and exceptional placement outcomes.',
    accreditation: 'Institute of National Importance',
    rating: 4.9,
    averageFees: 220000,
    placement: {
      placementRate: 94.0,
      averagePackageLpa: 21.8,
      highestPackageLpa: 100.0,
      topRecruiters: ['Google', 'Jane Street', 'Apple', 'McKinsey']
    },
    courses: [
      {
        name: 'B.Tech Computer Science and Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 225000,
        totalSeats: 120
      },
      {
        name: 'B.Tech Electrical Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 220000,
        totalSeats: 150
      }
    ],
    reviews: [
      {
        authorName: 'Meera Iyer',
        rating: 4.9,
        title: 'Unmatched peer group',
        body: 'The academic pressure is real, but the ecosystem is excellent for research, startups, and placements.'
      }
    ],
    cutoffs: [
      {
        examCode: 'jee-main',
        courseName: 'B.Tech Computer Science and Engineering',
        openingRank: 1,
        closingRank: 70
      }
    ]
  },
  {
    name: 'Delhi Technological University',
    slug: 'dtu-delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: CollegeType.GOVERNMENT,
    establishedYear: 1941,
    overview:
      'A well-regarded engineering university in Delhi with strong software, analytics, and core engineering placements.',
    accreditation: 'NAAC A',
    rating: 4.5,
    averageFees: 155000,
    placement: {
      placementRate: 89.0,
      averagePackageLpa: 13.4,
      highestPackageLpa: 64.0,
      topRecruiters: ['Adobe', 'Sprinklr', 'Samsung', 'Maruti Suzuki']
    },
    courses: [
      {
        name: 'B.Tech Software Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 160000,
        totalSeats: 180
      },
      {
        name: 'B.Tech Mechanical Engineering',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 150000,
        totalSeats: 190
      }
    ],
    reviews: [
      {
        authorName: 'Arjun Malik',
        rating: 4.4,
        title: 'Strong placements in Delhi NCR',
        body: 'The location and alumni network help a lot during internships and campus placements.'
      }
    ],
    cutoffs: [
      {
        examCode: 'jee-main',
        courseName: 'B.Tech Software Engineering',
        openingRank: 1500,
        closingRank: 8500
      }
    ]
  },
  {
    name: 'SRM Institute of Science and Technology',
    slug: 'srmist-chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: CollegeType.DEEMED,
    establishedYear: 1985,
    overview:
      'A deemed university with broad engineering options, flexible course choices, and a large recruiter base.',
    accreditation: 'NAAC A++',
    rating: 4.0,
    averageFees: 275000,
    placement: {
      placementRate: 79.5,
      averagePackageLpa: 7.6,
      highestPackageLpa: 42.5,
      topRecruiters: ['Wipro', 'Cognizant', 'HCL', 'Amazon']
    },
    courses: [
      {
        name: 'B.Tech Artificial Intelligence',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 290000,
        totalSeats: 240
      },
      {
        name: 'B.Tech Biotechnology',
        stream: 'Engineering',
        level: CourseLevel.UG,
        duration: '4 years',
        annualFees: 250000,
        totalSeats: 120
      }
    ],
    reviews: [
      {
        authorName: 'Nisha Varma',
        rating: 4.0,
        title: 'Plenty of options',
        body: 'A good fit for students who want many branches, clubs, and placement training support.'
      }
    ],
    cutoffs: [
      {
        examCode: 'jee-main',
        courseName: 'B.Tech Artificial Intelligence',
        openingRank: 15000,
        closingRank: 45000
      }
    ]
  },
  {
    name: 'Christ University',
    slug: 'christ-university-bangalore',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: CollegeType.DEEMED,
    establishedYear: 1969,
    overview:
      'A multidisciplinary university known for management, commerce, humanities, and urban campus exposure.',
    accreditation: 'NAAC A+',
    rating: 4.1,
    averageFees: 210000,
    placement: {
      placementRate: 76.0,
      averagePackageLpa: 6.8,
      highestPackageLpa: 21.0,
      topRecruiters: ['KPMG', 'Deloitte', 'EY', 'Goldman Sachs']
    },
    courses: [
      {
        name: 'BBA Finance and International Business',
        stream: 'Management',
        level: CourseLevel.UG,
        duration: '3 years',
        annualFees: 225000,
        totalSeats: 180
      },
      {
        name: 'B.Com Honours',
        stream: 'Commerce',
        level: CourseLevel.UG,
        duration: '3 years',
        annualFees: 180000,
        totalSeats: 240
      }
    ],
    reviews: [
      {
        authorName: 'Ishaan Dutta',
        rating: 4.2,
        title: 'Professional environment',
        body: 'The university is strict, but the exposure and placement preparation are strong.'
      }
    ],
    cutoffs: [
      {
        examCode: 'cuet',
        courseName: 'BBA Finance and International Business',
        openingRank: 500,
        closingRank: 6000
      }
    ]
  }
];

async function main() {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Cutoff", "Review", "Placement", "Course", "College", "EntranceExam" RESTART IDENTITY CASCADE'
  );

  const exams = await Promise.all(
    [
      { code: 'jee-main', name: 'JEE Main' },
      { code: 'viteee', name: 'VITEEE' },
      { code: 'mht-cet', name: 'MHT CET' },
      { code: 'met', name: 'Manipal Entrance Test' },
      { code: 'cuet', name: 'Common University Entrance Test' }
    ].map((exam) => prisma.entranceExam.create({ data: exam }))
  );
  const examByCode = new Map(exams.map((exam) => [exam.code, exam]));

  for (const college of colleges) {
    const createdCollege = await prisma.college.create({
      data: {
        name: college.name,
        slug: college.slug,
        city: college.city,
        state: college.state,
        type: college.type,
        establishedYear: college.establishedYear,
        overview: college.overview,
        accreditation: college.accreditation,
        rating: college.rating,
        averageFees: college.averageFees,
        placement: {
          create: college.placement
        },
        courses: {
          create: college.courses
        },
        reviews: {
          create: college.reviews
        }
      }
    });

    for (const cutoff of college.cutoffs) {
      const exam = examByCode.get(cutoff.examCode);
      if (!exam) {
        continue;
      }

      await prisma.cutoff.create({
        data: {
          collegeId: createdCollege.id,
          examId: exam.id,
          courseName: cutoff.courseName,
          openingRank: cutoff.openingRank,
          closingRank: cutoff.closingRank
        }
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
