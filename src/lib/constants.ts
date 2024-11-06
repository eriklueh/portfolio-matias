export const pythonCode = `
class Developer:
  def __init__(self):
      self.name = "Matias"
      self.role = "Backend Developer"
      
      self.skills = [
          "Python",
          "JavaScript",
          "Docker",
          "Kubernetes",
          "AWS",
          "CI/CD"
      ]

      self.projects = [
          {
              "name": "E-commerce Microservices",
              "tech": ["Python", "Docker", "Kubernetes"]
          },
          {
              "name": "CI/CD Pipeline",
              "tech": ["Jenkins", "GitLab", "AWS"]
          },
          {
              "name": "Music Streaming API",
              "tech": ["Node.js", "Express", "MongoDB"]
          }
      ]

      self.contact = {
          "email": "matias@example.com",
          "linkedin": "linkedin.com/in/matias-dev",
          "github": "github.com/matias-dev"
      }

  def introduce(self):
      print(f"¡Hola! Soy {self.name}")
      print(f"Soy {self.role}")

  def show_skills(self):
      print("Mis habilidades incluyen:")
      for skill in self.skills:
          print(f"- {skill}")

  def show_projects(self):
      print("Proyectos destacados:")
      for project in self.projects:
          print(f"- {project['name']} [{', '.join(project['tech'])}]")

  def show_contact(self):
      print("Contacto:")
      for key, value in self.contact.items():
          print(f"- {key}: {value}")

dev = Developer()
dev.introduce()
dev.show_skills()
dev.show_projects()
dev.show_contact()
`.split('\n')

export const goCode = `
package main

import "fmt"

type Project struct {
  Name string
  Tech []string
}

type Developer struct {
  Name     string
  Role     string
  Skills   []string
  Projects []Project
  Contact  map[string]string
}

func NewDeveloper() *Developer {
  return &Developer{
      Name: "Matias",
      Role: "Backend Developer",
      Skills: []string{
          "Go",
          "Python",
          "Docker",
          "Kubernetes",
          "AWS",
          "CI/CD",
      },
      Projects: []Project{
          {Name: "E-commerce Microservices", Tech: []string{"Go", "Docker", "Kubernetes"}},
          {Name: "CI/CD Pipeline", Tech: []string{"Jenkins", "GitLab", "AWS"}},
          {Name: "Music Streaming API", Tech: []string{"Go", "gRPC", "PostgreSQL"}},
      },
      Contact: map[string]string{
          "email":    "matias@example.com",
          "linkedin": "linkedin.com/in/matias-dev",
          "github":   "github.com/matias-dev",
      },
  }
}

func (d *Developer) Introduce() {
  fmt.Printf("¡Hola! Soy %s\n", d.Name)
  fmt.Printf("Soy %s\n", d.Role)
}

func (d *Developer) ShowSkills() {
  fmt.Println("Mis habilidades incluyen:")
  for _, skill := range d.Skills {
      fmt.Printf("- %s\n", skill)
  }
}

func (d *Developer) ShowProjects() {
  fmt.Println("Proyectos destacados:")
  for _, project := range d.Projects {
      fmt.Printf("- %s [%s]\n", project.Name, joinStrings(project.Tech))
  }
}

func (d *Developer) ShowContact() {
  fmt.Println("Contacto:")
  for key, value := range d.Contact {
      fmt.Printf("- 

 %s: %s\n", key, value)
  }
}

func joinStrings(strs []string) string {
  result := ""
  for i, s := range strs {
      if i > 0 {
          result += ", "
      }
      result += s
  }
  return result
}

func main() {
  dev := NewDeveloper()
  dev.Introduce()
  dev.ShowSkills()
  dev.ShowProjects()
  dev.ShowContact()
}
`.split('\n')

export const debugSteps = {
    python: [
        { name: 'init', lines: [2, 3, 4, 5], output: ['Inicializando Developer...'] },
        { name: 'skills', lines: [6, 7, 8, 9, 10, 11, 12], output: ['Definiendo habilidades...', '- Python', '- JavaScript', '- Docker', '- Kubernetes', '- AWS', '- CI/CD'] },
        { name: 'projects', lines: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], output: ['Definiendo proyectos...', '- E-commerce Microservices [Python, Docker, Kubernetes]', '- CI/CD Pipeline [Jenkins, GitLab, AWS]', '- Music Streaming API [Node.js, Express, MongoDB]'] },
        { name: 'contact', lines: [27, 28, 29, 30, 31], output: ['Definiendo información de contacto...', '- email: matias@example.com', '- linkedin: linkedin.com/in/matias-dev', '- github: github.com/matias-dev'] },
        { name: 'introduce', lines: [33, 34, 35], output: ['¡Hola! Soy Matias', 'Soy Backend Developer'] },
        { name: 'show_skills', lines: [37, 38, 39], output: ['Mis habilidades incluyen:', '- Python', '- JavaScript', '- Docker', '- Kubernetes', '- AWS', '- CI/CD'] },
        { name: 'show_projects', lines: [41, 42, 43], output: ['Proyectos destacados:', '- E-commerce Microservices [Python, Docker, Kubernetes]', '- CI/CD Pipeline [Jenkins, GitLab, AWS]', '- Music Streaming API [Node.js, Express, MongoDB]'] },
        { name: 'show_contact', lines: [45, 46, 47], output: ['Contacto:', '- email: matias@example.com', '- linkedin: linkedin.com/in/matias-dev', '- github: github.com/matias-dev'] },
    ],
    go: [
        { name: 'init', lines: [15, 16, 17, 18], output: ['Inicializando Developer...'] },
        { name: 'skills', lines: [19, 20, 21, 22, 23, 24, 25], output: ['Definiendo habilidades...', '- Go', '- Python', '- Docker', '- Kubernetes', '- AWS', '- CI/CD'] },
        { name: 'projects', lines: [27, 28, 29], output: ['Definiendo proyectos...', '- E-commerce Microservices [Go, Docker, Kubernetes]', '- CI/CD Pipeline [Jenkins, GitLab, AWS]', '- Music Streaming API [Go, gRPC, PostgreSQL]'] },
        { name: 'contact', lines: [31, 32, 33, 34, 35], output: ['Definiendo información de contacto...', '- email: matias@example.com', '- linkedin: linkedin.com/in/matias-dev', '- github: github.com/matias-dev'] },
        { name: 'introduce', lines: [39, 40, 41], output: ['¡Hola! Soy Matias', 'Soy Backend Developer'] },
        { name: 'show_skills', lines: [44, 45, 46, 47], output: ['Mis habilidades incluyen:', '- Go', '- Python', '- Docker', '- Kubernetes', '- AWS', '- CI/CD'] },
        { name: 'show_projects', lines: [50, 51, 52, 53], output: ['Proyectos destacados:', '- E-commerce Microservices [Go, Docker, Kubernetes]', '- CI/CD Pipeline [Jenkins, GitLab, AWS]', '- Music Streaming API [Go, gRPC, PostgreSQL]'] },
        { name: 'show_contact', lines: [56, 57, 58, 59], output: ['Contacto:', '- email: matias@example.com', '- linkedin: linkedin.com/in/matias-dev', '- github: github.com/matias-dev'] },
    ]
}