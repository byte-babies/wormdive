"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function SocialMediaGraph() {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up the SVG
    const width = 1000;
    const height = 700;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Define arrow marker
    svg.append('defs').append('marker')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#3b82f6')
      .style('stroke', 'none');

    // Define nodes and edges
    const nodes = [
      { id: 'email', name: 'user@example.com', type: 'email', group: 0 },
      { id: 'facebook', name: 'Facebook', type: 'social', group: 1 },
      { id: 'twitter', name: 'Twitter', type: 'social', group: 1 },
      { id: 'instagram', name: 'Instagram', type: 'social', group: 1 },
      { id: 'linkedin', name: 'LinkedIn', type: 'professional', group: 2 },
      { id: 'github', name: 'GitHub', type: 'professional', group: 2 },
      { id: 'youtube', name: 'YouTube', type: 'media', group: 3 },
      { id: 'reddit', name: 'Reddit', type: 'social', group: 1 },
      { id: 'discord', name: 'Discord', type: 'gaming', group: 4 },
      { id: 'telegram', name: 'Telegram', type: 'messaging', group: 5 },
      { id: 'whatsapp', name: 'WhatsApp', type: 'messaging', group: 5 },
      { id: 'tiktok', name: 'TikTok', type: 'media', group: 3 },
      { id: 'snapchat', name: 'Snapchat', type: 'social', group: 1 },
      { id: 'stackoverflow', name: 'Stack Overflow', type: 'professional', group: 2 },
      { id: 'medium', name: 'Medium', type: 'professional', group: 2 },
      { id: 'steam', name: 'Steam', type: 'gaming', group: 4 },
      { id: 'twitch', name: 'Twitch', type: 'gaming', group: 4 },
      { id: 'behance', name: 'Behance', type: 'professional', group: 2 },
      { id: 'xbox', name: 'Xbox Live', type: 'gaming', group: 4 }
    ];

    const links = nodes
      .filter(node => node.id !== 'email')
      .map(node => ({
        source: 'email',
        target: node.id,
        value: Math.random() * 0.5 + 0.5 // Random weight between 0.5 and 1
      }));

    // Add some cross-platform connections
    const crossLinks = [
      { source: 'facebook', target: 'instagram', value: 0.3 },
      { source: 'twitter', target: 'linkedin', value: 0.4 },
      { source: 'github', target: 'stackoverflow', value: 0.6 },
      { source: 'youtube', target: 'twitch', value: 0.3 },
      { source: 'discord', target: 'steam', value: 0.5 },
      { source: 'telegram', target: 'whatsapp', value: 0.2 },
      { source: 'reddit', target: 'youtube', value: 0.3 },
      { source: 'linkedin', target: 'medium', value: 0.4 },
      { source: 'instagram', target: 'tiktok', value: 0.4 },
      { source: 'snapchat', target: 'instagram', value: 0.3 }
    ];

    links.push(...crossLinks);

    // Create the force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))
      .force('x', d3.forceX().strength(0.1))
      .force('y', d3.forceY().strength(0.1));

    // Create the links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => d.source === 'email' ? '#3b82f6' : '#6b7280')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => d.value * 3)
      .attr('marker-end', 'url(#arrowhead)');

    // Create the nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => d.type === 'email' ? 35 : 20)
      .attr('fill', d => {
        switch(d.group) {
          case 0: return '#3b82f6'; // email
          case 1: return '#ef4444'; // social
          case 2: return '#10b981'; // professional
          case 3: return '#f59e0b'; // media
          case 4: return '#8b5cf6'; // gaming
          case 5: return '#06b6d4'; // messaging
          default: return '#6b7280';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer');

    // Add text labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', '#fff')
      .style('font-size', d => d.type === 'email' ? '14px' : '11px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none');

    // Add hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'email' ? 40 : 25);
      
      // Highlight connected links
      link.style('stroke-opacity', l => 
        l.source === d || l.target === d ? 1 : 0.1
      );
    })
    .on('mouseout', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'email' ? 35 : 20);
      
      // Reset link opacity
      link.style('stroke-opacity', 0.6);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        className="border border-border/30 rounded-lg bg-muted/20 shadow-lg"
      />
    </div>
  );
} 