# Docker Setup for Wedding Guest Portal

This project includes Docker configuration for both development and production environments.

## Quick Start

### Production Build
```bash
# Build and run production container
npm run docker:prod

# Or manually:
docker-compose up --build

# Access the application at http://localhost:3000
```

### Development Build
```bash
# Build and run development container with hot reload
npm run docker:dev

# Or manually:
docker-compose --profile dev up --build

# Access the application at http://localhost:3002
```

## Docker Commands

### Building Images
```bash
# Build production image
npm run docker:build

# Build development image
docker build -f Dockerfile.dev -t wedding-guest-portal-dev .
```

### Running Containers
```bash
# Run production container
npm run docker:run

# Run development container
docker run -p 3002:3002 -v $(pwd):/app -v /app/node_modules wedding-guest-portal-dev
```

### Managing Containers
```bash
# Stop all containers
npm run docker:stop

# View running containers
docker ps

# View logs
docker-compose logs

# Remove containers and images
docker-compose down --rmi all
```

## Docker Files Overview

- `Dockerfile` - Multi-stage production build with Nginx
- `Dockerfile.dev` - Development build with hot reload
- `docker-compose.yml` - Orchestration for both environments
- `.dockerignore` - Files to exclude from Docker context
- `nginx.conf` - Nginx configuration for production

## Environment Variables

Create a `.env` file for environment-specific variables:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_VERSION=1.0.0
```

## Production Deployment

For production deployment, the app is served by Nginx on port 80 inside the container, mapped to port 3000 on the host.

### Key Features:
- ✅ Multi-stage build for optimized image size
- ✅ Nginx serving static files
- ✅ React Router support (SPA routing)
- ✅ Static asset caching
- ✅ Gzip compression
- ✅ Security headers
- ✅ Development hot reload support

## Troubleshooting

### Module Federation
This app uses Webpack Module Federation. Ensure the exposed components are built correctly:
- Component exposed: `./SampleComponent` from `./src/shared/SampleComponent`
- Remote entry: `remoteEntry.js`
- Port: 3002 (development)

### Common Issues
1. **Port conflicts**: Change ports in docker-compose.yml if needed
2. **Module not found**: Ensure all dependencies are in package.json
3. **Hot reload not working**: Check CHOKIDAR_USEPOLLING=true in development
