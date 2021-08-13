pipeline {
	agent none
	node {
		docker.image('node:7-alpine').inside {
			stage('Test') {
				sh 'node --version'
			}
		}
	}
	stages {
		stage('Build') {
		steps {
			sh 'cd frontend'
			sh 'pwd'
			}
		}
	}
}
