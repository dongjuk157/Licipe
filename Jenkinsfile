pipeline {
	agent any
	stages {
		stage('Build') {
		steps {
			echo 'not here'
			sh 'ls'
			sh 'cp -r ./frontend ~/dist'
			}
		}

		stage('Start') {
			steps {
				dir('frontend') {
					sh 'ls'
				}
			}
		}
	}
}
