<?php

namespace MoPad\AdminBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use MoPad\AdminBundle\Controller\ApiController;

// run unit test with : $ phpunit -c app/

/**
 * test the GameAdmin APi, 
 * if this provides correctly the game data in JSON format
 * call the APi URL and check the result
 */
class MopadApiControllerTest extends WebTestCase
{

    public function testGetUniqueAppToken(){
    	// The createClient() method returns a client, which is like a browser that you'll use to crawl your site:
        $client = static::createClient();

		$crawler = $client->request(
		    'GET',
		    '/mopad/api/uniqueAppToken/123321',
		    array(),
		    array(),
		    array(
		        'CONTENT_TYPE' => 'application/json'
		    )
		);
		$response = $client->getResponse();
		$content = $response->getContent();
		//echo("JSON: ".$content);

		$this->assertEquals(200, $response->getStatusCode());
		// Assert that the response status code is 2xx
		$this->assertTrue($response->isSuccessful());

        $this->assertNotEmpty($content);
    }

    public function testApi()
    {
    	// The createClient() method returns a client, which is like a browser that you'll use to crawl your site:
        $client = static::createClient();

		$crawler = $client->request(
		    'GET',
		    '/mopad/api/getgames',
		    array(),
		    array(),
		    array(
		        'CONTENT_TYPE' => 'application/json'
		    )
		);
		$response = $client->getResponse();
		$content = $response->getContent();
		//echo("JSON: ".$content);
		
		
		$this->assertEquals(200, $response->getStatusCode());
		// Assert that the response status code is 2xx
		$this->assertTrue($response->isSuccessful());
		
		// GET JSON DATA
		$container = $client->getContainer();
		$serializer =  $container->get('jms_serializer');
		$data = $serializer->deserialize($content, 'Doctrine\Common\Collections\ArrayCollection', 'json');
		//$data = $serializer->deserialize($content, 'Doctrine\Common\Collections\ArrayCollection<MoPad\AdminBundle\Entity\Game>', 'json');
		//print_r($data);
		
		// CHECK content from json: id, name, description, image_url are required
		$max = $this->assertGreaterThan(0, sizeof($data));
		for($i = 0; $i < $max; $i++)
		{
			$gamedata = $data[i];
			$this->assertTrue(array_key_exists('id', $gamedata));
			$this->assertTrue(array_key_exists('name', $gamedata));
			$this->assertTrue(array_key_exists('description', $gamedata));
			$this->assertTrue(array_key_exists('image_url', $gamedata));
		}
		
    }
}
