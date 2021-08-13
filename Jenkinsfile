pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				dir('frontend') {
					sh 'yarn install'
					sh 'yarn build'
				}
			}
		}
		stage('Docker build') {
			steps {
				step {
					sh 'docker build -t licipe_front:latest.'
				}
			}
		}
		stage ('Docker run') {
			stpes {
				step {
					sh 'docker run -d --name nginx -p 80:80 licipe_front:latest'
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
