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
					sh 'docker ps -a'
					sh 'docker run --name nginx -d -p 80:80 -v ubuntu@ip-172-26-15-131:~/dist'
					sh 'docker cp jenkins_front:/var/jenkins_home/workspace/frontend/frontend ~/dist'
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
