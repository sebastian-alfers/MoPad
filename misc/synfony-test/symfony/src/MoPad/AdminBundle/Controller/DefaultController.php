<?php

namespace MoPad\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use MoPad\AdminBundle\Entity\Game;

class DefaultController extends Controller
{
    /**
     * @Route("/hello/{name}", name="_mopad_hello")
     * @Template()
     */
    public function indexAction($name)
    {
        return array('name' => $name);
    }
	
	/**
     * @Route("/create", name="_mopad_create")
     * @Template()
     */
	public function createAction()
	{
	    $game = new Game();
	    $game->setName('Move the Box');
	    $game->setDescription('Game Description');
		$game->setApiKey('apikeyGame1');
		$game->setVendor('GameVendor');
    	$game->setActivated(false);
		$game->setMinPlayer(1);
		$game->setMaxPlayer(2);
    	$game->setAcceptedGamePads('JoyStick', 'JoyPad');
	
	    $em = $this->getDoctrine()->getManager();
	    $em->persist($game);
	    $em->flush();
	
	    return new Response('Created product id '.$game->toString());
	}
	
	/**
     * @Route("/show", name="_mopad_show")
     * @Template()
     */
	public function showAction($id)
	{
	    $game = $this->getDoctrine()
	        ->getRepository('MoPadAdminBundle:Game')
	        ->find($id);
	
	    if (!$game) {
	        throw $this->createNotFoundException('No game found for id '.$id);
	    }
		
	    return new Response('game: '.$game->toString());
	}
}