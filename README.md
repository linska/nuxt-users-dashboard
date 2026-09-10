# Nuxt Users Dashboard

A responsive user dashboard built with Nuxt, Vue 3, and TypeScript.

The application provides user filtering, sorting, pagination, URL-based state persistence, and light/dark themes.

## Live Demo

[View the deployed application](https://nuxt-users-dashboard.netlify.app/)

## Features

* Search by user name or email
* Filter users by role
* Sort users by age and creation date
* Three-state sorting: ascending, descending, and disabled
* Pagination with 10, 15, 20, or all users per page
* State synchronization with URL query parameters
* State restoration after page reload
* Debounced search input
* Highlighted search matches
* Sticky table header
* Light and dark themes
* Responsive layout
* Empty search results state

## Tech Stack

* Nuxt
* Vue 3
* TypeScript
* Vue Router
* CSS

## Query Parameters

The table state is stored in the URL and can be shared or restored after a page reload.

Supported query parameters:

| Parameter       | Description                             | Example              |
| --------------- | --------------------------------------- | -------------------- |
| `search`        | Search by name or email                 | `?search=user`       |
| `role`          | Filter by user role                     | `?role=admin`        |
| `sortBy`        | Sorting field                           | `?sortBy=age`        |
| `sortDirection` | Sorting direction                       | `?sortDirection=asc` |
| `page`          | Current page                            | `?page=2`            |
| `perPage`       | Number of users per page; `0` means all | `?perPage=20`        |

Example:

```text
?search=user&role=admin&sortBy=age&sortDirection=desc&page=2&perPage=10
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
assets/css/          Global styles and theme variables
components/          Reusable UI and table components
composables/         Users table state and query synchronization
constants/           Pagination and sorting constants
data/                Generated user data
layouts/             Application layout and theme handling
pages/               Application pages
types/               TypeScript types
utils/               Filtering, sorting, and validation helpers
```
