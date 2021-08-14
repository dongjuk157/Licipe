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
					sh 'docker run -p 8888:80 --rm licipe:front'

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
