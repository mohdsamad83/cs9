import swaggerJsdoc from 'swagger-jsdoc'
import components from './openapi.components.js'
import paths from './openapi.paths.js'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Rogāre API',
      version: '1.0.0',
      description: 'API documentation for the Rogāre backend service.',
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        description: 'Local development server',
        variables: {
          port: { default: '3000' },
        },
      },
    ],
    tags: [
      { name: 'System' },
      { name: 'Authentication' },
      { name: 'Users' },
      { name: 'Questions' },
      { name: 'FAQs' },
      { name: 'Answers' },
      { name: 'Comments' },
      { name: 'Flags' },
      { name: 'Notifications' },
      { name: 'Admin' },
      { name: 'Leaderboard' },
    ],
    components,
    paths,
  },
  apis: [],
})

export default swaggerSpec
