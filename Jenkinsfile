pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				sh 'cp -r ./frontend ~/dist'
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
