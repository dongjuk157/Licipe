pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				sh 'cp -r ./frontend ubuntu@ip-172-26-15-131:~/dist'
			}
		}

		stage('Start') {
			steps {
				echo 'here'
			}
		}
	}
	post {
		success {
			echo 'i am her'
		}
	}
}
