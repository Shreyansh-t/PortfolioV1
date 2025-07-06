# Retro Terminal Portfolio

A personal portfolio website with a retro 1980s computer terminal theme. Built with Next.js, TypeScript, and Tailwind CSS. Features an interactive terminal interface where users can navigate using real terminal commands.

## Features

- **Interactive Terminal**: Navigate through the portfolio using real terminal commands
- **Retro Aesthetic**: 1980s computer terminal theme with green text on black background
- **Functional Contact Form**: EmailJS integration for sending emails directly from frontend
- **Responsive Design**: Works on both desktop and mobile devices
- **Static Export**: Optimized for deployment on GitHub Pages or Vercel

## Terminal Commands

- `ls` - List directory contents
- `cd [directory]` - Change directory
- `pwd` - Print working directory
- `cat [file]` - Display file contents
- `touch [file]` - Create/open file
- `clear` - Clear terminal
- `exit` - Exit terminal mode
- `help` - Show available commands

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up EmailJS for the contact form:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create a new service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `{{from_name}}` - sender's name
     - `{{from_email}}` - sender's email
     - `{{subject}}` - email subject
     - `{{message}}` - email message
     - `{{to_email}}` - recipient email
   - Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   NEXT_PUBLIC_TO_EMAIL=your_email@domain.com
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
```

## Deploy

### GitHub Pages
1. Build the project: `npm run build`
2. Export static files: `npm run export`
3. Deploy the `out` folder to GitHub Pages

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push

## Customization

To customize this portfolio for your own use:

1. **Update personal information** in `app/components/ContentDisplay.tsx`:
   - Replace placeholder text with your details
   - Update project information
   - Modify experience section
   - Add your contact information

2. **Customize terminal file system** in `app/components/Terminal.tsx`:
   - Add your own files and directories
   - Update file contents in the `cat` command
   - Add custom commands if needed

3. **Styling**:
   - Modify colors in `tailwind.config.js`
   - Update fonts in `app/globals.css`
   - Adjust layout in component files

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **EmailJS** - Frontend email service
- **Share Tech Mono** - Retro monospace font

## License

MIT License - feel free to use this as a template for your own portfolio! 