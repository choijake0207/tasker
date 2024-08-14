import React, {createContext, useEffect, useState} from 'react'
import { initialProjects } from '../Data/InitialData'

export const ProjectContext = createContext()



export function ContextProvider({children}) {

  // initialize state from either saved data or blank template
    const [projects, setProjects] = useState(() => {
      const savedProjects = localStorage.getItem("projects")
      if (savedProjects) {
        return JSON.parse(savedProjects)
      } else {
        localStorage.setItem("projects", JSON.stringify(initialProjects))
        return initialProjects
      }
    })

    // save data change to local storage
    useEffect(() => {
      localStorage.setItem("projects", JSON.stringify(projects))
    }, [projects])

    // add task
    const addTask = (projectId, columnId, task) => {
      setProjects(prev => prev.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            columns: project.columns.map(column => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tasks: [...column.tasks, task]
                } 
              }
              return column
            })
          }
        } return project
      }))
    }
    // delete task
    const deleteTask = (projectId, columnId, taskId) => {
      setProjects(prev => prev.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            columns: project.columns.map(column => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tasks: column.tasks.filter(task => task.id !== taskId)
                }
              }
              return column
            })
          }
        }
        return project
      }))
    }
    // add column
    const addColumn = (projectId, column) => {
      setProjects(prev => prev.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            columns: [...project.columns, column]
          }
        }
        return project
      }))
    }
    const deleteColumn = (projectId, columnId) => {
      setProjects(prev => prev.map(project => {
        if (project.id === projectId) {
          const updatedColumns = project.columns.filter(column => column.id !== columnId)
          return {
            ...project,
            columns: updatedColumns
          }
        }
        return project
      }))
    }
    // add project
    const addProject = (project) => {
      setProjects(prev => ([...prev, project]))
    }
    // delete project
    const deleteProject = (projectId) => {
      setProjects(prev => prev.filter(project => project.id !== projectId))
    }




    const values = {projects, setProjects, addTask, deleteTask, addProject, deleteProject, addColumn, deleteColumn}

  return (
    <ProjectContext.Provider value={values}>
        {children}
    </ProjectContext.Provider>
  )
}
