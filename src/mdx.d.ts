declare module '*.mdx' {
  import { ComponentType } from 'react'
  import { ProjectMetadata } from './lib/projects'
  
  const component: ComponentType
  export default component
  
  export const frontmatter: ProjectMetadata
}

