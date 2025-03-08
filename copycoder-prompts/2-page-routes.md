Set up the page structure according to the following prompt:
   
<page-structure-prompt>
Next.js route structure based on navigation menu items (excluding main route). Make sure to wrap all routes with the component:

Routes:
- /overview
- /dashboard
- /contacts
- /business
- /tasks
- /profile
- /settings
- /reports
- /users

Page Implementations:
/overview:
Core Purpose: Provide high-level summary of all workspace activities
Key Components
- Activity feed
- Quick stats cards
- Recent updates panel
- Team activity timeline
Layout Structure
- Grid layout with 2-3 columns
- Collapsible sidebar
- Responsive cards that stack on mobile

/dashboard:
Core Purpose: Central hub for user's primary tasks and metrics
Key Components
- Customizable widget grid
- Performance metrics
- Task priority queue
- Notification center
Layout Structure
- Modular grid system
- Draggable widgets
- Sticky header with key actions

/contacts:
Core Purpose: Manage and organize leads effectively
Key Components:
- Lead list table with sorting and filtering
- Quick add/edit modal for new contacts
- Lead status indicators (new, contacted, qualified, etc.)
- Search and advanced filtering options
Layout Structure:
- Table-based central view
- Slide-out detail panel
- Responsive design with mobile-friendly lead cards

/business:
Core Purpose: Manage and track business deals
Key Components:
- Pipeline view (Kanban board style)
- Deal details modal (status, value, associated contacts)
- Quick actions (move deal stage, assign users)
- Filters and pipeline views (by stage, user, or value)
Layout Structure:
- Kanban board with drag-and-drop functionality
- Collapsible sidebar for pipeline customization
- Responsive card-based layout

/tasks:
Core Purpose: Task management and organization
Key Components
- Task list with filters
- Status toggles
- Priority markers
- Assignment dropdown
Layout Structure
- List view with categories
- Split view for task details
- Collapsible sections

/tools:
Core Purpose: Access to workspace utilities and integrations
Key Components
- Tool categories
- Integration cards
- Quick access buttons
- Settings panels
Layout Structure
- Card grid layout
- Category tabs
- List view on mobile

/metrics:
Core Purpose: Analytics and performance tracking
Key Components
- Data visualization charts
- KPI cards
- Date range selector
- Export options
Layout Structure
- Dashboard style layout
- Responsive charts
- Scrollable data tables

/back-button:
Core Purpose: Navigation history management
Key Components
- History stack
- Previous page preview
- Navigation options
Layout Structure
- Modal overlay
- Breadcrumb trail
- Minimal mobile view

/tasks-report:
Core Purpose: Comprehensive task analysis and reporting
Key Components
- Report generator
- Filters and parameters
- Export functionality
- Data tables
Layout Structure
- Two-column layout
- Sticky controls
- Scrollable results

/search:
Core Purpose: Global search functionality
Key Components
- Search bar
- Filters
- Results list
- Recent searches
Layout Structure
- Full-width search
- Results grid

/manage:
Core Purpose: Workspace and user management
Key Components
- User permissions
- Resource allocation
- Settings panels
- Admin controls
Layout Structure
- Tab-based navigation
- Form layouts
- Mobile-friendly controls

/share:
Core Purpose: Content sharing and collaboration
Key Components
- Share modal
- Permission settings
- Link generator
- User selector
Layout Structure
- Centered modal
- Permission matrix
- Mobile bottom sheet

/profile:
Core Purpose: User profile management and security settings
Key Components:
- Profile information update form
- Password change and two-factor authentication setup
- Notification preferences (email, push notifications)
Layout Structure:
- Tabbed navigation (Profile, Security, Notifications)
- Clear form inputs with validation indicators
- Responsive design with intuitive navigation

/settings:
Core Purpose: Centralized system configuration and preferences
Key Components:
- Notification center settings
- Two-factor authentication configuration
- Theme selection (dark/light mode toggle)
Layout Structure:
- Vertical navigation sidebar
- Clear toggle switches and intuitive settings forms
- Real-time theme preview

/reports:
Core Purpose: Generate insights through customizable reports
Key Components:
- Report generation wizard
- Pre-defined report templates (sales, performance, activity)
- Data visualization charts (bar, line, pie)
- Export options (PDF, CSV, Excel)
Layout Structure:
- Modular report builder
- Interactive chart components
- Responsive reports that adapt clearly to mobile

/users:
Core Purpose: User management for admins and managers
Key Components:
- User list with roles and access permissions
- Add/Edit user form
- User activity logs
- Quick user search and role filters
Layout Structure:
- Central user table with detailed modals
- Collapsible sidebar for quick actions
- Responsive design ensuring clarity on all devices

Layouts:
MainLayout:
- Applicable routes: All except /back-button
- Core components: Navigation, Header, Footer
- Responsive behavior: Collapsible sidebar, mobile navigation menu

DashboardLayout
- Applicable routes: /dashboard, /metrics, /tasks-report
- Core components: Sidebar, Widget Grid, Action Bar
- Responsive behavior: Stack widgets vertically on mobile

ModalLayout
- Applicable routes: /share, /create-task, /back-button
- Core components: Modal Container, Backdrop, Close Button
- Responsive behavior: Full-screen on mobile, centered on desktop
</page-structure-prompt>