pipeline {
	agent none
	tools {nodejs 'nodejs'}
	stages {
		stage('Build') {
			agent {
				docker {
					image 'node:12-alpine'
				}
			}
			steps {
				dir ('frontend') {
					sh "npm install -g yarn"
					sh 'rm -f package-lock.json'
					sh 'yarn install'
					sh 'yarn build'
				}
			}
		}
		stage('Docker build') {
			agent any
			steps {
				dir ('frontend') {
					sh 'docker build -t licipe:front .'
				}
			}
		}
		stage ('Docker run') {
			steps {
				dir ('frontend') {
				sh 'docker ps -f name=nginx-react-container -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=nginx-react-container -q | xargs -r docker container rm'
                sh 'docker rmi $(docker images -f "dangling=true" -q)'
                sh 'docker run -d --name nginx-react-container -p 80:80 nginx-react-image:latest'
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
