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
					sh 'docker -v'
					sh 'pwd'
					sh 'ls'
					sh 'docker build -t licipe_front:latest.'
				}
			}
		}
		stage ('Docker run') {
			steps {
				sh 'docker run -d --name nginx -p 80:80 licipe_front:latest'
			}
		}
	}
	post {
		success {
			echo 'i am her'
		}
	}
}
