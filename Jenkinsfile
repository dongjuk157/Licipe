pipeline {
	agent any
	stages {
		stage('Build') {
			dir('frontend') {
				sh 'yarn install'
				sh 'yarn build'
			}
		}
		stage('Docker build') {
			steps {
				sh 'docker build -t licipe_front:latest.'
			}
		}
		stage ('Docker run') {
			stpes {
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
