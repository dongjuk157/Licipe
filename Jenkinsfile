pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				sh 'cp -r ./frontend ubuntu@i5b206.p.ssafy.io:/dist'
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
