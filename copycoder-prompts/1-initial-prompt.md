Initialize Next.js in current directory:
```bash
mkdir temp; cd temp; npx create-next-app@latest . -y --typescript --tailwind --eslint --app --use-npm --src-dir --import-alias "@/*" -no --turbo
```

Now let's move back to the parent directory and move all files except prompt.md.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

Set up the frontend according to the following prompt:
<frontend-prompt>
Create detailed components with these requirements:
1. Use 'use client' directive for client-side components
2. Make sure to concatenate strings correctly using backslash
3. Style with Tailwind CSS utility classes for responsive design
4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
7. Create root layout.tsx page that wraps necessary navigation items to all pages
8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
9. Accurately implement necessary grid layouts
10. Follow proper import practices:
   - Use @/ path aliases
   - Keep component imports organized
   - Update current src/app/page.tsx with new comprehensive code
   - Don't forget root route (page.tsx) handling
   - You MUST complete the entire prompt before stopping

<summary_title>
Tecnoleads Crm Dashboard
</summary_title>

<image_analysis>

1. Navigation Elements:
- Left sidebar with: Dashboard, Contacts, Business, Tasks, Profile, Settings, Reports, Users, Report Bug, Send Feedback, Logout
- Top navigation with: Back button, Notifications, Reminders, Dark-mode, Create New Lead
- Secondary navigation: Spreadsheet, Board, , Kanban, Calendar
- Task status filters: Backlog, In progress, Validation, Done
- Leads Status: New Lead, In Contact, Inactive
- Business Status: Make a quote, Follow-up, Negotiation, Gain, Lost


2. Layout Components:
- Left sidebar: 240px width
- Main content area: Flexible width (calc(100% - 240px))
- Top header: 64px height
- Task cards: ~300px width
- Spacing: 16px between components
- Padding: 24px container padding


3. Content Sections:
- Leads status overview cards
- Business status overview cards
- Task list with detailed cards
- User avatars and collaboration indicators
- Progress indicators and metrics


4. Interactive Controls:
- Create lead button (primary action)
- Filter and Widget toggles
- Task status toggles
- Send lead to another collaborator
- Add new users
- Card action menus (...)


5. Colors:
Primary: #00167a – Deep corporate blue, providing a professional and trustworthy feel.
Secondary: #d10413 – Vibrant red, ideal for highlighting critical actions and important information.
Accent: #ffb400 – Rich golden-yellow, perfect for drawing attention to interactive elements.
Success: #16a34a – Fresh green, clearly indicating positive outcomes and success notifications.
Background: #f5f7fa – Soft neutral grey, ensuring comfortable readability during extended use.
Chart colors: A selection of complementary colors for clarity and visual distinction in charts:
#00167a (Primary Blue)
#d10413 (Secondary Red)
#ffb400 (Accent Yellow)
#16a34a (Success Green)
#22c55e (Alternative Green for variety)
#64748b (Medium Neutral Grey for balance)


6. Grid/Layout Structure:
- 12-column grid system
- 24px gutter width
- Responsive breakpoints at 768px, 1024px, 1440px
- Card grid with auto-fit minmax(300px, 1fr)
</image_analysis>

<development_planning>

1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── TaskGrid
│   ├── features/
│   │   ├── LeadCard
│   │   ├── BusinessCard
│   │   ├── Charts
│   │   └── Filters
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```


2. Key Features:
- Lead status management
- Business status management
- Performance metrics
- Search and filtering
- Real-time updates


3. State Management:
```typescript
interface AppState {
├── tasks: {
│   ├── items: Task[]
│   ├── status: StatusMap
│   ├── filters: FilterOptions
│   └── sorting: SortOptions
├── }
├── metrics: {
│   ├── burndown: ChartData
│   ├── comments: CommentData
│   └── commits: CommitData
├── }
}
```


4. Routes:
```typescript
const routes = [
├── '/dashboard',
├── '/leads/*',
├── '/business/*',
├── '/profile',
├── '/users',
├── '/tasks',
├── '/reports',
└── '/settings'
]
```


5. Component Architecture:
- TaskBoard (container)
- LeadList (presentation)
- LeadCard (presentation)
- BusinessList (presentation)
- BusinessCard (presentation)
- MetricsChart (container)
- FilterBar (presentation)


6. Responsive Breakpoints:
```scss
$breakpoints: (
├── 'sm': '768px',
├── 'md': '1024px',
├── 'lg': '1440px',
└── 'xl': '1920px'
);
```
</development_planning>
</frontend-prompt>

IMPORTANT: Please ensure that (1) all KEY COMPONENTS and (2) the LAYOUT STRUCTURE are fully implemented as specified in the requirements. Ensure that the color hex code specified in image_analysis are fully implemented as specified in the requirements.