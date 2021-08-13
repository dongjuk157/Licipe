pipeline {
	agent any
	tools {nodejs 'nodejs'}
	stages {
		stage('Build') {
			steps {
				dir ('frontend') {
					sh "npm install -g yarn"
					sh 'yarn install'
					sh 'yarn build'
				}
			}
		}
		stage('Docker build') {
			steps {
				dir ('frontend') {
					sh 'apt-get update && apt-get install -y docker.io'
					sh 'docker -v'
					sh 'pwd'
					sh 'ls'
					sh 'docker build -t licipe:front .'
				}
			}
		}
		stage ('Docker run') {
			steps {
				dir ('frontend') {
					sh 'docker stop nginx'
					sh 'docker run -d --rm --name nginx -p 80:80 licipe:front'
					sh 'docker cp jenkins/jenkins:/var/jenkins_home/workspace/frontend/frontend ~/dist'
				}
			}
		}
	}
	post {
		success {
			echo 'i am her'
		}
	}
}
