/* =====================================================================
   UNIFIED TEXTILE PORTAL  —  DATA FILE
   ---------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO PLUG IN REAL SCHEME CONTENT.

   Every scheme, its benefits, eligibility, documents and process live
   here. The dashboards render automatically from this object, so once
   you paste the exact wording from your official scheme documents
   (NHHP, Tex-RAMPS, PM MITRA 2.0, TEEM EFC, MGGSI, NFS, TexEco), the
   four beneficiary pages update with no other changes required.

   NOTE: The scheme details below are REPRESENTATIVE PLACEHOLDERS built
   from the scheme names. A few full names (marked "provisional") were
   inferred and should be corrected against the source documents.
   ===================================================================== */

window.PORTAL_DATA = {

  /* ---- ROLE / BENEFICIARY DEFINITIONS ------------------------------ */
  roles: {
    farmer: {
      key: "farmer",
      label: "Farmer",
      blurb: "Schemes and support for cotton, jute, silk and other fibre-crop farmers.",
      profile: {
        name: "Ramesh Kumar",
        id: "FARM-2026-00123",
        fields: [
          ["Location", "Vidarbha, Maharashtra"],
          ["Primary crop", "Cotton (long staple)"],
          ["Land holding", "3.5 acres"],
          ["Bank linked", "Yes — Aadhaar seeded"]
        ]
      },
      // scheme the beneficiary has already enrolled in
      availed: {
        nfs: {
          status: "Active",
          appliedOn: "12 Jan 2026",
          sanctioned: "₹18,000 input subsidy + MSP linkage",
          disbursed: "₹12,000 disbursed",
          progress: 66,
          nextStep: "MSP procurement window opens Nov 2026"
        }
      },
      // schemes shown as "available to apply"
      available: ["mggsi", "texeco"]
    },

    weaver: {
      key: "weaver",
      label: "Weaver",
      blurb: "Handloom, yarn, welfare and marketing support for weavers and artisans.",
      profile: {
        name: "Lakshmi Devi",
        id: "WVR-2026-04517",
        fields: [
          ["Location", "Varanasi, Uttar Pradesh"],
          ["Craft", "Banarasi Silk Handloom"],
          ["Looms owned", "2 pit looms"],
          ["Weaver ID (Pehchan)", "Verified"]
        ]
      },
      availed: {
        nhhp: {
          status: "Active",
          appliedOn: "03 Feb 2026",
          sanctioned: "Yarn subsidy + loom upgradation",
          disbursed: "Loom accessory kit delivered",
          progress: 75,
          nextStep: "Marketing exhibition slot allotted — Sep 2026"
        }
      },
      available: ["tex-ramps", "mggsi", "texeco"]
    },

    industrialist: {
      key: "industrialist",
      label: "Industrialist",
      blurb: "Manufacturing incentives, textile parks and industry upgradation support.",
      profile: {
        name: "Anil Verma",
        id: "IND-2026-00891",
        fields: [
          ["Company", "Verma Textiles Pvt. Ltd."],
          ["Sector", "Apparel Manufacturing"],
          ["Location", "Surat, Gujarat"],
          ["Workforce", "120 employees"]
        ]
      },
      availed: {
        "tex-ramps": {
          status: "Sanctioned",
          appliedOn: "20 Dec 2025",
          sanctioned: "₹25 lakh technology-upgradation grant",
          disbursed: "₹15 lakh released (1st tranche)",
          progress: 60,
          nextStep: "Submit machinery installation certificate"
        }
      },
      available: ["pm-mitra", "teem-efc", "texeco"]
    },

    student: {
      key: "student",
      label: "Student",
      blurb: "Skilling, stipend, certification and placement in the textile sector.",
      profile: {
        name: "Priya Sharma",
        id: "STU-2026-07734",
        fields: [
          ["Course", "Textile Design & Technology"],
          ["Institute", "NIFT (demo record)"],
          ["Location", "New Delhi"],
          ["Year", "2nd Year"]
        ]
      },
      availed: {
        "teem-efc": {
          status: "In Training",
          appliedOn: "15 Jan 2026",
          sanctioned: "Stipend ₹2,500/month + NSQF certification",
          disbursed: "3 months' stipend paid",
          progress: 40,
          nextStep: "Mid-term skill assessment — Aug 2026"
        }
      },
      available: ["tex-ramps", "texeco"]
    }
  },

  /* ---- SCHEME MASTER LIST ------------------------------------------
     Paste your official document wording into these fields.
     `categories` controls which beneficiary pages a scheme appears on.
  ------------------------------------------------------------------- */
  schemes: {

    "pm-mitra": {
      id: "pm-mitra",
      name: "PM MITRA 2.0",
      full: "PM Mega Integrated Textile Region and Apparel Parks (Phase 2.0)",
      monogram: "PM",
      accent: "#8a5a2b",
      authority: "Ministry of Textiles, Government of India",
      timeline: "60–90 working days for park allotment",
      tagline: "World-class integrated textile parks with plug-and-play infrastructure.",
      categories: ["industrialist"],
      benefits: [
        "Development Capital Support of up to ₹500 crore per park",
        "Competitiveness Incentive Support of up to ₹300 crore",
        "Ready plug-and-play factory space inside the park",
        "Shared utilities — power, water, common effluent treatment",
        "Single-window clearances and dedicated SPV support"
      ],
      eligibility: [
        "Registered textile manufacturing company or SPV",
        "Commitment to a minimum investment and employment threshold",
        "Willingness to locate the unit within a designated MITRA park"
      ],
      documents: [
        "Certificate of incorporation and GST registration",
        "Detailed Project Report (DPR)",
        "Investment and employment generation plan",
        "Land / built-up space requirement letter",
        "Audited financial statements"
      ],
      process: [
        "Register on the portal and submit an Expression of Interest",
        "DPR appraisal by the park SPV",
        "Allotment of plot / factory space",
        "Sign the lease and commence construction",
        "Claim incentives on achieving milestones"
      ]
    },

    "tex-ramps": {
      id: "tex-ramps",
      name: "Tex-RAMPS",
      full: "Textile Raising and Accelerating MSME Performance Scheme (provisional)",
      monogram: "TR",
      accent: "#a06a2c",
      authority: "Ministry of Textiles / DC-MSME",
      timeline: "45 working days from complete application",
      tagline: "Credit, technology and market support for textile MSMEs and artisan units.",
      categories: ["industrialist", "weaver", "student"],
      benefits: [
        "Credit guarantee and interest subvention on term loans",
        "Grant for technology and machinery upgradation",
        "Capacity building and market-linkage support",
        "Reimbursement of ISO / quality certification cost"
      ],
      eligibility: [
        "Udyam-registered textile or handloom MSME",
        "In operation for at least one year",
        "Valid GST registration and active bank account"
      ],
      documents: [
        "Udyam registration certificate",
        "GST registration",
        "Bank statement (last 6 months)",
        "Machinery quotation or invoice",
        "Brief project proposal"
      ],
      process: [
        "Register and submit the enterprise proposal",
        "Verification by the District Industries Centre",
        "Sanction of subsidy / guarantee",
        "Amount disbursed directly to the bank account"
      ]
    },

    "nhhp": {
      id: "nhhp",
      name: "NHHP",
      full: "National Handloom Development Programme",
      monogram: "NH",
      accent: "#7a4b2e",
      authority: "Office of the Development Commissioner (Handlooms)",
      timeline: "30 working days from verification",
      tagline: "End-to-end support for handloom weavers — yarn, looms, welfare and marketing.",
      categories: ["weaver"],
      benefits: [
        "Subsidised yarn under the Yarn Supply Scheme",
        "Loom and accessory upgradation assistance",
        "Concessional weaver credit (Weaver MUDRA)",
        "Marketing, expo and exhibition support",
        "Skill upgradation and design inputs"
      ],
      eligibility: [
        "Weaver holding a valid Pehchan / Weaver ID card",
        "Working independently or through a handloom cooperative",
        "Aadhaar-linked bank account"
      ],
      documents: [
        "Weaver Pehchan card",
        "Aadhaar card",
        "Bank passbook",
        "Cooperative membership proof (if any)",
        "Recent passport photograph"
      ],
      process: [
        "Register using the Weaver ID",
        "Select the component required (yarn, loom, credit, marketing)",
        "Verification by the cluster / handloom office",
        "Benefit sanctioned and delivered"
      ]
    },

    "mggsi": {
      id: "mggsi",
      name: "MGGSI",
      full: "Mahatma Gandhi Grameen Suraksha Initiative — Handloom & Handicraft (provisional)",
      monogram: "MG",
      accent: "#6f4a2f",
      authority: "Ministry of Textiles — Welfare Division",
      timeline: "21 working days from enrolment",
      tagline: "Social security, insurance and grievance support for rural textile artisans.",
      categories: ["weaver", "farmer"],
      benefits: [
        "Life and accident insurance cover",
        "Health assistance for the artisan and family",
        "Old-age / pension support",
        "Grievance redressal and family welfare benefits"
      ],
      eligibility: [
        "Rural weaver or artisan aged 18–60",
        "Annual income below the prescribed ceiling",
        "Valid artisan / weaver identity record"
      ],
      documents: [
        "Aadhaar card",
        "Age proof",
        "Income certificate",
        "Artisan / weaver ID",
        "Bank account and nominee details"
      ],
      process: [
        "Register and select the welfare / insurance component",
        "Government-subsidised premium contribution",
        "Policy issued and welfare benefits activated"
      ]
    },

    "nfs": {
      id: "nfs",
      name: "NFS",
      full: "National Fibre Scheme — Cotton, Jute, Silk & Natural Fibres (provisional)",
      monogram: "NF",
      accent: "#7d6a2a",
      authority: "Ministry of Textiles / State Agriculture Departments",
      timeline: "Aligned with the sowing and harvest season",
      tagline: "Support for fibre-crop farmers — quality seed, MSP linkage and cultivation aid.",
      categories: ["farmer"],
      benefits: [
        "Certified seed and input subsidy",
        "Minimum Support Price procurement linkage",
        "Drip irrigation and farm-mechanisation assistance",
        "Training on quality fibre cultivation",
        "Linkage to crop insurance"
      ],
      eligibility: [
        "Farmer cultivating notified fibre crops (cotton, jute, mesta, mulberry)",
        "Land record in own name or valid tenancy",
        "Registered on the agriculture / PM-KISAN database"
      ],
      documents: [
        "Land record (Khasra / Khatauni)",
        "Aadhaar card",
        "Bank account details",
        "Crop and area declaration",
        "PM-KISAN ID (if available)"
      ],
      process: [
        "Register and declare the fibre crop and area",
        "Field verification by the agriculture officer",
        "Input subsidy released",
        "Procurement / MSP linkage activated at harvest"
      ]
    },

    "teem-efc": {
      id: "teem-efc",
      name: "TEEM EFC",
      full: "Textile Employment & Entrepreneurship Mission — Skilling (provisional)",
      monogram: "TE",
      accent: "#946126",
      authority: "Ministry of Textiles — Skilling Division",
      timeline: "Course-dependent (3–12 months)",
      tagline: "Industry-aligned textile skilling, stipend and placement for students and youth.",
      categories: ["student", "industrialist"],
      benefits: [
        "Free or subsidised skill training in textile trades",
        "Monthly training stipend",
        "NSQF-aligned certification",
        "Placement assistance on completion",
        "Apprenticeship and entrepreneurship support"
      ],
      eligibility: [
        "Indian citizen aged 18–35",
        "Meets the minimum qualification for the chosen course",
        "Not drawing a stipend under another government scheme"
      ],
      documents: [
        "Aadhaar card",
        "Qualification marksheet",
        "Bank account details",
        "Passport photograph",
        "Category certificate (if applicable)"
      ],
      process: [
        "Register and choose a course and training centre",
        "Enrol and attend the training",
        "Complete the assessment",
        "Receive certification and placement support"
      ]
    },

    "texeco": {
      id: "texeco",
      name: "TexEco",
      full: "Textile Ecosystem & Sustainability Programme (provisional)",
      monogram: "TX",
      accent: "#5f7a3a",
      authority: "Ministry of Textiles — Value Chain & Sustainability",
      timeline: "Rolling / continuous enrolment",
      tagline: "Awareness, green practices and market access across the textile value chain.",
      categories: ["farmer", "weaver", "industrialist", "student"],
      benefits: [
        "Advisory and awareness across the value chain",
        "Support for sustainable and eco-friendly practices",
        "Access to the e-marketplace and buyer linkages",
        "Branding support (India Handloom / GI tagging)",
        "Participation in national and international expos"
      ],
      eligibility: [
        "Any registered stakeholder in the textile value chain",
        "Farmer, weaver, MSME, student or entrepreneur",
        "Valid identity / registration record"
      ],
      documents: [
        "Relevant ID (Aadhaar / Udyam / Weaver ID)",
        "Registration proof",
        "Product or portfolio details (if applicable)"
      ],
      process: [
        "Register and select an interest area",
        "Onboarding and advisory session",
        "Access marketplace and branding tools"
      ]
    }
  }
};
