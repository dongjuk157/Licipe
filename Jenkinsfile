pipeline {
	agent any
	stages {
		stage('Build') {
			sh 'cp -r ./frontend ubuntu@ip-172-26-15-131:~/dist'
		}

		stage('Start') {
			steps {
				echo 'here'
			}
		}
	}
	post {
		success {
			'i am her'
		}
	}
}
