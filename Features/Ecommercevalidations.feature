Feature: Ecommerce Error

		Scenario Outline: Error validation
		Given a login to Ecommerce2 application with "<username>" and "<password>"
		Then Verify Error message is displayed

		 Examples:
          | username    	  | 	password  |
          | archa@gmail.com | 12345678  |
       
       