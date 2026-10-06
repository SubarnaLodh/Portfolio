# Subarna Lodh — Academic Portfolio & Interactive COA Platform

**Student:** Subarna Lodh  
**UID:** 25BAI10051  
**Branch:** B.E. CSE (AI) — in collaboration with Microsoft  
**University:** Chandigarh University, Mohali  

An academic portfolio website and interactive Computer Organization & Architecture (COA) learning platform designed for university faculty demonstrations and showcase.

---

## 🚀 Key Highlights

1. **Academic & Professional Profile**:
   - Modern, academic technology design adhering to deep navy, royal blue, and cyan palettes.
   - Comprehensive resume integration with 100% verified facts from curriculum records.
   - Education timeline with CGPA 7.9 at Chandigarh University and previous school records.

2. **Interactive Computer Organization & Architecture (COA) Tools**:
   - **Number System Converter**: Supports all 12 pairwise conversions across **Binary (Base 2)**, **Decimal (Base 10)**, **Octal (Base 8)**, and **Hexadecimal (Base 16)**.
   - Mathematical step-by-step calculation derivations (positional expansion, successive division traces, 3-bit and 4-bit grouping).
   - Multi-base equivalence summary ($101101_2 = 45_{10} = 55_8 = 2D_{16}$).
   - Hardware register bit-cell visualizer (bits and nibbles).
   - Copy Result, Swap Bases, Clear, and instant validation handling.
   - Modular roadmap cards for 7 upcoming COA simulator modules (Binary ALU, Complements, Cache Mapping, Physical Addressing, Paging, Page Replacement, CPU Scheduling).

3. **Featured Project (COA)**:
   - Dedicated showcase for **Instruction Set Simulator** with direct links to [GitHub Repository](https://github.com/SubarnaLodh/25BAI10051-Instruction-Set-Simulator-COA.git) and README.
   - Additional projects: Student Management System, Cyber Threat Dashboard, and Real-time Weather App.

4. **Achievements & Interactive Gallery**:
   - Integrated Green Mobility Ideathon 2026.
   - Microsoft Azure Fundamentals AZ-900 Certification.
   - Responsive gallery with interactive Lightbox Modal.

5. **COA Assignments & Lecture Questions**:
   - All 12 authentic assignment questions and answers submitted to Dr. Ruchika Gupta.
   - Collapsible accordions with live search/filter input.
   - Structured hardware comparison matrix (CPU vs TPU vs GPU) and AI Summit key takeaways.
   - Direct link to view the original PDF document.

6. **Privacy First**:
   - Full residential address from the resume is withheld from the public website for safety.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons

---

## 📖 Instructions & Customization Guide

### 1. Running Locally

Clone or open the directory in your terminal:

```bash
# Navigate to the project directory
cd "c:\Users\Subarna Lodh\OneDrive\Desktop\MY NEW WEBSITE"

# Install dependencies (already installed)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify production build:
```bash
npm run build
npm run start
```

---

### 2. Replacing the Profile Photo

1. Place your professional portrait photo (e.g. `profile.jpg` or `profile.png`) into the `public/` directory:
   ```
   public/profile.jpg
   ```
2. Open [`src/components/Hero.tsx`](file:///src/components/Hero.tsx).
3. Replace the placeholder container inside the profile card with an `<img>` tag or Next.js `<Image />`:
   ```tsx
   <img
     src="/profile.jpg"
     alt="Subarna Lodh - Profile Photo"
     className="w-full h-full object-cover rounded-2xl"
   />
   ```

---

### 3. Replacing / Updating the Resume PDF

1. To update your resume, copy your new PDF file into the `public/docs/` folder:
   ```
   public/docs/Subarna_Lodh_Resume.pdf
   ```
2. Any button linking to `portfolioData.student.documents.resumePdf` in [`src/data/portfolio.ts`](file:///src/data/portfolio.ts) will automatically open and download the updated document.

---

### 4. Adding Achievement Images

1. Place certificate or event images into `public/achievements/` (e.g. `az900.jpg`, `ideathon.jpg`).
2. Open [`src/components/Achievements.tsx`](file:///src/components/Achievements.tsx) or [`src/data/portfolio.ts`](file:///src/data/portfolio.ts).
3. Set the image path in the achievement item and render `<img src={item.imageUrl} alt={item.title} />` in place of the placeholder box.

---

### 5. Updating LinkedIn URL

1. Open [`src/data/portfolio.ts`](file:///src/data/portfolio.ts).
2. Locate `contact.linkedinUrl` and change `[LINKEDIN_URL]` to your profile URL:
   ```typescript
   linkedinUrl: "https://www.linkedin.com/in/your-username",
   ```

---

### 6. Updating LeetCode URL

1. Open [`src/data/portfolio.ts`](file:///src/data/portfolio.ts).
2. Locate `contact.leetcodeUrl` and change `[LEETCODE_URL]` to your profile URL:
   ```typescript
   leetcodeUrl: "https://leetcode.com/u/your-username",
   ```

---

### 7. Adding More COA Tools

The platform is built with a modular architecture:
1. Create a new component inside `src/components/` (e.g., `BinaryArithmeticCalculator.tsx`).
2. Import it inside [`src/components/COATools.tsx`](file:///src/components/COATools.tsx).
3. In [`src/data/portfolio.ts`](file:///src/data/portfolio.ts), update the tool status from `"COMING SOON"` to `"ACTIVE"`.

---

### 8. Updating Assignments & Lecture Questions

All assignments are centralized in [`src/data/portfolio.ts`](file:///src/data/portfolio.ts) under `assignments`:
- You can add new questions by appending a new object with `id`, `question`, `category`, `summary`, and `answer`.
- The live search filter and accordion render new entries automatically without touching UI code.

---

### 9. Deploying to Vercel

1. Push this project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Subarna Lodh academic portfolio"
   git branch -M main
   git remote add origin https://github.com/SubarnaLodh/portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
3. Click **"Add New..."** → **"Project"**.
4. Import your `portfolio` repository.
5. Vercel automatically detects **Next.js**. Click **"Deploy"**.
6. In ~60 seconds, your portfolio will be live at `https://subarna-lodh.vercel.app`!
