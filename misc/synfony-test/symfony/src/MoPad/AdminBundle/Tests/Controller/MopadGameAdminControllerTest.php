<?php

namespace MoPad\AdminBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use MoPad\AdminBundle\Controller\ApiController;

/**
 * Test the correct GameAdmin access.
 * 
 *
 * @package MoPad\AdminBundle\Tests\Controller
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * 
 * @example run unit test with : $ phpunit -c app/
 * 
 * @method testLogin()
 * @method testLogin2()
 */
class MopadGameAdminControllerTest extends WebTestCase
{
	/**
	 * call the login page and test the login values.
	 * test the correct access to the GameAdmin dashboard.
	 * check the correct response status.
	 */
    public function testLogin()
    {
    	// The createClient() method returns a client, which is like a browser that you'll use to crawl your site:
        $client = static::createClient();
		
		
		// LOGIN
		$crawler  = $client->request('GET', '/admin/login');
		$form = $crawler->selectButton('_submit')->form();
		// set some values
		$form['_username'] = 'admin';
		$form['_password'] = 'admin';
		// submit the form
		$crawler = $client->submit($form);
		// status code 302 da weiterleitung nach home http://mopad-symfony.de/
		$this->assertEquals(302, $client->getResponse()->getStatusCode());
		
		
		// DASHBOARD
		$crawler  = $client->request('GET', '/admin/dashboard');
		$this->assertEquals(200, $client->getResponse()->getStatusCode());
		//echo("Dashboard: ".$client->getResponse());
		
		/* LIST
		$link = $crawler->filter('a:contains("/admin/mopad/admin/game/list")')->eq(1)->link();
		$crawler = $client->click($link);
		$this->assertEquals(200, $client->getResponse()->getStatusCode());*/
    }
	
	/**
	 * call direct the dashboard and eter login data.
	 * check the correct response status.
	 */
	public function testLogin2()
    {
    	// The createClient() method returns a client, which is like a browser that you'll use to crawl your site:
        $client = static::createClient();
		
		
		// LOGIN
		$crawler  = $client->request('GET', 
			'/admin/dashboard', 
			array(), array(), array(
		    'PHP_AUTH_USER' => 'admin',
		    'PHP_AUTH_PW'   => 'admin',
		));
		
		// status code 302 (redirected) from /admin/login to /admin/dashboard
		$this->assertEquals(302, $client->getResponse()->getStatusCode());
		// Assert that the response is a redirect
		$this->assertTrue( $client->getResponse()->isRedirect() );
    }
	
	/**
	 * @ignore
	 */
	public function testCreate()
    {
    	// The createClient() method returns a client, which is like a browser that you'll use to crawl your site:
        $client = static::createClient();
		
		// login
		
		/* CREATE
		$crawler  = $client->request('GET', '/admin/dashboard');
		$link = $crawler->filter('a:contains("create")')->eq(1)->link();
		$crawler = $client->click($link);
		$form = $crawler->selectButton('btn_create_and_edit')->form();
		$form['name'] = 'Lucas';
		$form['form_name[subject]'] = 'Hey there!';
		$crawler = $client->submit($form);
		 */
		 /* http://symfony.com/doc/master/book/testing.html#book-testing-request-method-sidebar
		  * // Directly submit a form (but using the Crawler is easier!)
			$client->request('POST', '/submit', array('name' => 'Fabien'));
			
			// Form submission with a file upload
			use Symfony\Component\HttpFoundation\File\UploadedFile;
			
			$photo = new UploadedFile(
			    '/path/to/photo.jpg',
			    'photo.jpg',
			    'image/jpeg',
			    123
			);
			// or
			$photo = array(
			    'tmp_name' => '/path/to/photo.jpg',
			    'name' => 'photo.jpg',
			    'type' => 'image/jpeg',
			    'size' => 123,
			    'error' => UPLOAD_ERR_OK
			);
			$client->request(
			    'POST',
			    '/submit',
			    array('name' => 'Fabien'),
			    array('photo' => $photo)
			);
		  */
    }
}
