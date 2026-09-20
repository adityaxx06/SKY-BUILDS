# SKY BUILDS — DATABASE SPECIFICATION

**Version:** 1.0
**Status:** Approved Foundation

---

# 1. Database Philosophy

The database is secondary to the frontend.

Do not create tables merely because they might be useful in the future.

Use Supabase PostgreSQL for information that benefits from:

* Dynamic management
* Admin editing
* Persistent submissions
* Structured content

---

# 2. Initial Database Entities

Planned entities:

```text
projects
services
testimonials
team_members
contact_submissions
```

Not all entities need to be implemented in the first backend phase.

---

# 3. Projects

Table:

```text
projects
```

Suggested fields:

```text
id
title
slug
category
short_description
description
year
services
technologies
hero_image
challenge
solution
result_summary
featured
display_order
created_at
updated_at
```

### Requirements

* `id` must uniquely identify a project.
* `slug` must be unique.
* `featured` determines whether the project appears in selected work.
* `display_order` controls presentation order.
* Timestamps must be automatically maintained.

---

# 4. Project Images

If project galleries become sufficiently complex, use a separate table:

```text
project_images
```

Suggested fields:

```text
id
project_id
image_url
alt_text
display_order
created_at
```

Relationship:

```text
projects
   │
   └── project_images
```

A project may contain multiple images.

---

# 5. Services

Table:

```text
services
```

Suggested fields:

```text
id
title
slug
short_description
description
icon
display_order
active
created_at
updated_at
```

Initial services:

```text
Website Design & Development
Web Applications
UI/UX Design
Website Redesign
E-commerce
```

---

# 6. Testimonials

Table:

```text
testimonials
```

Suggested fields:

```text
id
client_name
client_role
company
content
avatar_url
featured
display_order
created_at
updated_at
```

### Important

Only real testimonials should be published.

Do not populate this table with fabricated client experiences.

---

# 7. Team Members

Table:

```text
team_members
```

Suggested fields:

```text
id
name
role
bio
image_url
linkedin_url
display_order
active
created_at
updated_at
```

This table is optional until the real team content is available.

---

# 8. Contact Submissions

Table:

```text
contact_submissions
```

Fields (implemented in Phase 9):

```text
id
name
email
project_type
budget
timeline
company
reference_url
message
status
created_at
updated_at
```

Status values:

```text
new
read
in_progress
closed
```

Notes:
- `phone` field was removed in favor of `timeline` and `reference_url` for richer project context
- Row Level Security: public INSERT only, authenticated admin READ/UPDATE
- Migration: `supabase/migrations/001_create_contact_submissions.sql`

---

# 9. Contact Security

Contact submissions contain private user-provided information.

Requirements:

* They must not be publicly readable.
* Only authorized administrators can access them.
* Row Level Security must be considered/implemented.
* Server-side validation is required.
* Never expose private submissions in public API responses.

---

# 10. Authentication

Supabase Auth is responsible for admin authentication.

Potential admin identity model:

```text
Supabase Auth
      ↓
Authenticated user
      ↓
Authorization check
      ↓
Admin dashboard
```

Do not build a custom password authentication system.

---

# 11. Row Level Security

Recommended principles:

### Projects

Public users:

**READ published projects**

Admins:

**CREATE / READ / UPDATE / DELETE**

### Services

Public users:

**READ active services**

Admins:

**CREATE / READ / UPDATE / DELETE**

### Testimonials

Public users:

**READ published testimonials**

Admins:

**CREATE / READ / UPDATE / DELETE**

### Team

Public users:

**READ active team members**

Admins:

**CREATE / READ / UPDATE / DELETE**

### Contact submissions

Public users:

**INSERT**

Admins:

**READ / UPDATE**

Public users:

**NO READ**

---

# 12. Demo Content Strategy

Initially, demo content may be stored locally rather than immediately inserted into Supabase.

Example:

```text
src/features/projects/project-data.ts
```

This allows frontend development to continue without backend dependency.

Once the frontend is approved:

```text
Local demo data
      ↓
Supabase
```

can be introduced.

---

# 13. Storage

Supabase Storage may be used for:

* Project images
* Team images
* Testimonial avatars
* Other agency media

Storage should not be introduced until required.

---

# 14. Database Naming Rules

Use:

* lowercase
* snake_case
* descriptive names

Examples:

```text
contact_submissions
project_images
team_members
```

Avoid ambiguous names such as:

```text
data
stuff
info
items
```

---

# 15. Migration Strategy

Database changes must be versioned.

Do not manually make undocumented production changes.

Every schema change should be reproducible.

---

# 16. Database Non-Goals

The project does not require:

* Prisma
* Redis
* Elasticsearch
* Vector database
* Complex event sourcing
* Microservices database architecture
* Separate database server

Supabase PostgreSQL is sufficient for the planned requirements.

---

# 17. Future Expansion

Possible future entities:

```text
blog_posts
case_studies
inquiries
faq_items
site_settings
```

These should only be introduced when a real product requirement exists.

Do not build speculative infrastructure.
